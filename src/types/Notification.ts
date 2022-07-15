interface IRemoteNotificationMessage {
  header: string
  schema: string
  text: string
  url: string
}

interface IRemoteNotification {
  n_id: string
  n_category: string
  created_on: number
  message: IRemoteNotificationMessage
}

interface INotification extends IRemoteNotification {}

export default INotification
