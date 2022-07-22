import React, { useEffect } from 'react'
import { useConfigStore, useNotificationStore } from '../store'
import { getClientNotificationStorage } from '../utils'

interface ISuprSendProviderProps {
  workspaceKey: string
  workspaceSecret: string
  distinctId: string
  subscriberId: string
  children: React.ReactElement | React.ReactElement[]
}

async function handleSubscriberChange(
  workspaceKey: string,
  workspaceSecret: string,
  distinctId: string,
  subscriberId?: string
) {
  let storedData = await getClientNotificationStorage(workspaceKey)
  if (storedData.subscriberId === subscriberId) {
    useNotificationStore.setState(() => ({
      notifications: storedData.notifications,
      lastFetchedOn: null
    }))
  } else {
    useNotificationStore.setState(() => ({
      notifications: [],
      lastFetchedOn: null
    }))
  }
  useConfigStore.setState(() => ({
    workspaceKey,
    workspaceSecret,
    distinctId,
    subscriberId
  }))

  // start polling
  const store = useNotificationStore.getState()
  if (subscriberId && !store.lastFetchedOn) {
    store.fetchNotifications()
  }
}

function SuprSendProvider({
  children,
  workspaceKey,
  workspaceSecret,
  distinctId,
  subscriberId
}: ISuprSendProviderProps): JSX.Element {
  useEffect(() => {
    handleSubscriberChange(
      workspaceKey,
      workspaceSecret,
      distinctId,
      subscriberId
    )
    return () => {
      useNotificationStore.getState().clearPolling()
    }
  }, [subscriberId])

  return <React.Fragment>{children}</React.Fragment>
}

export default SuprSendProvider
