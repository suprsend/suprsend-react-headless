import React from 'react'
import {
  SuprSendProvider,
  useNotifications,
  useNotification,
  IRemoteNotification
} from 'suprsend-react-headless'

const data = [
  { sid: '', did: '' },
  {
    did: 'katta.sivaram@suprsend.com',
    sid: 'zcBZpqtxN5W5fAyaJ1QXEnzmLvDThfBLvqg8B7sOt0Y'
  },
  {
    did: 'skme902902@gmail.com',
    sid: '2t8r9WtUZhK8G97Kb0Bb96rr1PkJdmZQyrnLnfcVE4w'
  }
]

const App = () => {
  const [user, setUser] = React.useState(data[0])
  const [page, setPage] = React.useState('home')

  React.useEffect(() => {
    setTimeout(() => {
      setUser(data[1])
    }, 5000)
  }, [])

  return (
    <SuprSendProvider
      workspaceKey='kfWdrPL1nFqs7OUihiBn'
      workspaceSecret='From1HA1ZiSXs3ofBHXh'
      subscriberId={user.sid}
      distinctId={user.did}
    >
      <button
        onClick={() => {
          setPage((prev) => {
            return prev === 'home' ? 'notifications' : 'home'
          })
        }}
      >
        Click
      </button>
      {page === 'home' ? <Home /> : <Notifications />}
    </SuprSendProvider>
  )
}

function Home() {
  return <h1>Home</h1>
}

function Notifications() {
  const { notifications } = useNotifications()

  return (
    <div>
      <h3>Notifications</h3>
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
