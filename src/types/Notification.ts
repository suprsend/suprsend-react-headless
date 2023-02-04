interface IRemoteNotificationMessage {
  header: string
  schema: string
  text: string
  url: string
  extra_data?: string
  actions?: { url: string; name: string }[]
}

export interface IRemoteNotification {
  n_id: string
  n_category: string
  created_on: number
  seen_on?: number
  message: IRemoteNotificationMessage
}

export interface INotification extends IRemoteNotification {
  markClicked: () => void
}
