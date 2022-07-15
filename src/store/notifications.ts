import create from 'zustand'
import INotificationStore from '../types/NotificationStore'

const useNotificationStore = create<INotificationStore>(() => ({
  notifications: [],
  unSeenCount: 0,
  lastFetchedOn: null
}))

export default useNotificationStore
