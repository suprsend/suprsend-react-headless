import create from 'zustand'
import INotificationStore from '../types/NotificationStore'

const notificationStore = create<INotificationStore>(() => ({
  notifications: [],
  unSeenCount: 0,
  lastFetchedOn: null
}))

export default notificationStore
