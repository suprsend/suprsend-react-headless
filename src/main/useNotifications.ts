import { useEffect } from 'react'
import { useNotificationStore } from '../store'
import { INotificationStore } from '../types'

export default function useNotifications() {
  const store = useNotificationStore((store: INotificationStore) => store)

  useEffect(() => {
    if (!store.lastFetchedOn) {
      store.fetchNotifications()
    }
  }, [])

  return {
    notifications: store.notifications,
    unSeenCount: store.unSeenCount,
    markClicked: store.markClicked,
    markAllSeen: store.markAllSeen
  }
}
