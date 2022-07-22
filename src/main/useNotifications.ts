import { useEffect } from 'react'
import { useNotificationStore, useConfigStore } from '../store'
import { IConfigStore, INotificationStore } from '../types'

export default function useNotifications() {
  const store = useNotificationStore((store: INotificationStore) => store)
  const subscriberId = useConfigStore(
    (store: IConfigStore) => store.subscriberId
  )

  useEffect(() => {
    if (subscriberId && !store.lastFetchedOn) {
      store.fetchNotifications()
    }
    return () => {
      store.clearPolling()
    }
  }, [subscriberId])

  return {
    notifications: store.notifications,
    unSeenCount: store.unSeenCount,
    markClicked: store.markClicked,
    markAllSeen: store.markAllSeen
  }
}
