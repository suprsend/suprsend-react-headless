import { IRemoteNotification } from '../types'
import { useNotificationStore } from '../store'

export default function useNotification(notification: IRemoteNotification) {
  const store = useNotificationStore()
  return {
    notification: notification,
    markClicked: () => store.markClicked(notification.n_id)
  }
}
