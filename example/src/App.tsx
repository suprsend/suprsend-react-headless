import React from 'react'
import {
  SuprSendProvider,
  useNotifications,
  useNotification,
  IRemoteNotification
  // useBell
} from 'suprsend-react-headless'

const App = () => {
  return (
    <SuprSendProvider
      workspaceKey='kfWdrPL1nFqs7OUihiBn'
      workspaceSecret='From1HA1ZiSXs3ofBHXh'
      subscriberId='2t8r9WtUZhK8G97Kb0Bb96rr1PkJdmZQyrnLnfcVE4w'
      distinctId='skme902902@gmail.com'
    >
      <h3>Notifications</h3>
      {/* <UnseenCount /> */}
      <NotificationList />
    </SuprSendProvider>
  )
}

// function UnseenCount() {
//   const { unSeenCount } = useBell()
//   return <p>UnSeen: {unSeenCount}</p>
// }

function NotificationList() {
  const { notifications, unSeenCount, markAllSeen } = useNotifications()

  return (
    <div>
      <p
        onClick={() => {
          markAllSeen()
        }}
      >
        {unSeenCount}
      </p>
      {notifications.map((notification: IRemoteNotification) => {
        return <NotificationItem notification={notification} />
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
