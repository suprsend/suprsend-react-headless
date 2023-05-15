import React from 'react'
import {
  SuprSendProvider,
  useNotifications,
  useNotification,
  IRemoteNotification,
  useBell
} from 'suprsend-react-headless'

const App = () => {
  return (
    <SuprSendProvider
      workspaceKey={process.env.REACT_APP_WORKSPACE_KEY || ''}
      workspaceSecret={process.env.REACT_APP_WORKSPACE_SECRET || ''}
      subscriberId={process.env.REACT_APP_SUBSCRIBER_ID || ''}
      distinctId={process.env.REACT_APP_DISTINCT_ID || ''}
    >
      <Notifications />
    </SuprSendProvider>
  )
}

function Notifications() {
  const { notifications } = useNotifications()
  const { unSeenCount, markAllSeen } = useBell()

  return (
    <div>
      <h3
        onClick={() => {
          markAllSeen()
        }}
      >
        Notifications {unSeenCount}
      </h3>
      {notifications.map((notification: IRemoteNotification) => {
        return (
          <NotificationItem
            notification={notification}
            key={notification.n_id}
          />
        )
      })}
    </div>
  )
}

function NotificationItem({
  notification
}: {
  notification: IRemoteNotification
}) {
  const data = useNotification(notification)

  return (
    <div
      style={{ display: 'flex' }}
      onClick={() => {
        data.markClicked()
      }}
    >
      <p>{notification.n_id}</p>
      {!notification.seen_on && <p>*</p>}
    </div>
  )
}

export default App
