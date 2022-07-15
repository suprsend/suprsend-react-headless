import IRemoteNotification from './Notification'

export default interface INotificationStore {
  notifications: IRemoteNotification[]
  unSeenCount: number
  lastFetchedOn: number | null
}
