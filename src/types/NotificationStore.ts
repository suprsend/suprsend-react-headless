import { IRemoteNotification } from './Notification'

export default interface INotificationStore {
  notifications: IRemoteNotification[]
  unSeenCount: number
  lastFetchedOn: number | null
  firstFetchedOn: number | null
  pollingTimerId?: ReturnType<typeof setTimeout>
  fetchNotifications: () => void
  fetchPrevious: () => void
  markClicked: (id: string) => void
  markAllSeen: () => void
  clearPolling: () => void
  markAllRead: () => void
}
