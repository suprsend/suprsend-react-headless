import create from 'zustand'
import { useConfigStore } from '../store'
import { INotificationStore, IRemoteNotification } from '../types'
import {
  getNotifications,
  markNotificationClicked,
  markBellClicked
} from '../api'
import { getStorageKey, setStorage } from '../utils'

interface IInternalStorage {
  notifications: IRemoteNotification[]
  subscriberId: string
}

const useNotificationStore = create<INotificationStore>()((set, get) => ({
  notifications: [],
  unSeenCount: 0,
  lastFetchedOn: null,

  fetchNotifications: async () => {
    const config = useConfigStore.getState()
    const thisStore = get()
    const currentFetchingOn = Date.now()
    const lastFetchedOn =
      thisStore.lastFetchedOn || currentFetchingOn - 30 * 24 * 60 * 60 * 1000

    try {
      const response = await getNotifications(lastFetchedOn)
      const data = await response.json()
      const newNotifications = [...data.results, ...thisStore.notifications]
      set(() => ({
        notifications: newNotifications,
        unSeenCount: thisStore.unSeenCount + data.unread,
        lastFetchedOn: currentFetchingOn
      }))
      // set in client storage
      const storageKey = getStorageKey(config.workspaceKey)
      const storageData: IInternalStorage = {
        notifications: newNotifications.slice(0, config.batchSize),
        subscriberId: config.subscriberId
      }
      setStorage(storageKey, storageData)
    } catch (e) {
      console.log('Error Getting Notificatons API')
    }

    // polling
    setTimeout(() => {
      thisStore.fetchNotifications()
    }, config.pollingInterval)
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
