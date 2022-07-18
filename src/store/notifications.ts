import create from 'zustand'
import { useConfigStore } from '../store'
import { INotificationStore, IRemoteNotification } from '../types'
import {
  getNotifications,
  markNotificationClicked,
  markBellClicked
} from '../api'

const useNotificationStore = create<INotificationStore>()((set, get) => ({
  notifications: [],
  unSeenCount: 0,
  lastFetchedOn: null,

  fetchNotifications: async () => {
    const pollingInterval = useConfigStore.getState().pollingInterval
    const thisStore = get()
    const currentFetchingOn = Date.now()
    const lastFetchedOn =
      thisStore.lastFetchedOn || currentFetchingOn - 30 * 24 * 60 * 60 * 1000

    try {
      const response = await getNotifications(lastFetchedOn)
      const data = await response.json()
      set(() => ({
        notifications: [...thisStore.notifications, ...data.results],
        unSeenCount: thisStore.unSeenCount + data.unread,
        lastFetchedOn: currentFetchingOn
      }))
    } catch (e) {
      console.log('Error Getting Notificatons API')
    }

    // polling
    setTimeout(() => {
      thisStore.fetchNotifications()
    }, pollingInterval)
  },

  markClicked: (id: string) => {
    const notifications = get().notifications
    const clickedNotification = notifications.find(
      (item: IRemoteNotification) => item.n_id === id
    )
    if (!clickedNotification) return
    if (!clickedNotification.seen_on) {
      markNotificationClicked(id)
      clickedNotification.seen_on = Date.now()
      set((store: INotificationStore) => ({ ...store }))
    }
  },

  markAllSeen: async () => {
    const res = await markBellClicked()
    if (!res.ok) return
    set((store: INotificationStore) => ({ ...store, unSeenCount: 0 }))
  }
}))

export default useNotificationStore
