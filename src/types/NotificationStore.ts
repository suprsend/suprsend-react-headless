import IRemoteNotification from './Notification'

export default interface INotificationStore {
  notifications: IRemoteNotification[]
  unSeenCount: number
  lastFetchedOn: number | null
  fetchNotifications: () => void
  markClicked: (id: string) => void
  markAllSeen: () => void
}
