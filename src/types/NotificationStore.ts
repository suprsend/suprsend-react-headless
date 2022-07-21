import { IRemoteNotification } from './Notification'

export default interface INotificationStore {
  notifications: IRemoteNotification[]
  unSeenCount: number
  lastFetchedOn: number | null
  pollingTimerId?: ReturnType<typeof setTimeout>
  clearPolling: () => void
  fetchNotifications: () => void
  markClicked: (id: string) => void
  markAllSeen: () => void
}
