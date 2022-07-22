import create from 'zustand'
import { useConfigStore } from '../store'
import { INotificationStore, IRemoteNotification } from '../types'
import {
  getNotifications,
  markNotificationClicked,
  markBellClicked
} from '../api'
import { setClientNotificationStorage } from '../utils'
import { suprSendEmitter } from '../main/useEvent'

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
    const isFirstCall = !thisStore.lastFetchedOn
    const currentFetchingOn = Date.now()
    const lastFetchedOn =
      thisStore.lastFetchedOn || currentFetchingOn - 30 * 24 * 60 * 60 * 1000

    try {
      const response = await getNotifications(lastFetchedOn)
      const data = await response.json()
      const newNotifications = isFirstCall
        ? [...data.results]
        : [...data.results, ...thisStore.notifications]
      set(() => ({
        notifications: newNotifications,
        unSeenCount: thisStore.unSeenCount + data.unread,
        lastFetchedOn: currentFetchingOn
      }))

      // emit new notification event
      if (!isFirstCall && data.results.length > 0) {
        suprSendEmitter.emit('new_notification', data.results)
      }

      // set in client storage
      const storageData: IInternalStorage = {
        notifications: newNotifications.slice(0, config.batchSize),
        subscriberId: config.subscriberId
      }
      setClientNotificationStorage(storageData)
    } catch (e) {
      console.log('SUPRSEND: error while getting notifications', e)
    }

    // polling
    const timerId: ReturnType<typeof setTimeout> = setTimeout(() => {
      thisStore.fetchNotifications()
    }, config.pollingInterval)
    set(() => ({ pollingTimerId: timerId }))
  },

  clearPolling: () => {
    const pollingTimerId = get().pollingTimerId
    set({ lastFetchedOn: null })
    clearTimeout(pollingTimerId)
  },

  markClicked: (id: string) => {
    const notifications = get().notifications
    const clickedNotification = notifications.find(
      (item: IRemoteNotification) => item.n_id === id
    )
    if (clickedNotification && !clickedNotification.seen_on) {
      markNotificationClicked(id)
      clickedNotification.seen_on = Date.now()
      set((store: INotificationStore) => ({ ...store }))

      // set in client storage
      const config = useConfigStore.getState()
      const storageData: IInternalStorage = {
        notifications: notifications.slice(0, config.batchSize),
        subscriberId: config.subscriberId
      }
      setClientNotificationStorage(storageData)
    }
  },

  markAllSeen: async () => {
    const res = await markBellClicked()
    if (!res.ok) return
    set((store: INotificationStore) => ({ ...store, unSeenCount: 0 }))
  }
}))

export default useNotificationStore
