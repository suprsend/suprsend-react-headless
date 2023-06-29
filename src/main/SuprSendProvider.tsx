import React, { useEffect } from 'react'
import { useConfigStore, useNotificationStore } from '../store'
import { getClientNotificationStorage } from '../utils'

interface ISuprSendProviderProps {
  workspaceKey: string
  workspaceSecret?: string
  distinctId: string
  subscriberId: string
  children: React.ReactElement | React.ReactElement[]
  pollingInterval?: number
}

async function handleSubscriberChange(
  workspaceKey: string,
  workspaceSecret: string,
  distinctId: string,
  pollingInterval: number,
  subscriberId?: string
) {
  let storedData = await getClientNotificationStorage(workspaceKey)
  if (storedData.subscriberId === subscriberId) {
    useNotificationStore.setState(() => ({
      notifications: storedData.notifications,
      unSeenCount: 0,
      lastFetchedOn: null,
      firstFetchedOn: null
    }))
  } else {
    useNotificationStore.setState(() => ({
      notifications: [],
      unSeenCount: 0,
      lastFetchedOn: null,
      firstFetchedOn: null
    }))
  }
  if (pollingInterval < 7) {
    pollingInterval = 7
  }
  useConfigStore.setState(() => ({
    workspaceKey,
    workspaceSecret,
    distinctId,
    subscriberId,
    pollingInterval: pollingInterval * 1000 || 20 * 1000
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
  workspaceSecret = '86316ba1-657d-4c23-b381-0b4c2d3ebcba',
  distinctId,
  subscriberId,
  pollingInterval = 20
}: ISuprSendProviderProps): JSX.Element {
  useEffect(() => {
    handleSubscriberChange(
      workspaceKey,
      workspaceSecret,
      distinctId,
      pollingInterval,
      subscriberId
    )
    return () => {
      useNotificationStore.getState().clearPolling()
    }
  }, [subscriberId])

  return <React.Fragment>{children}</React.Fragment>
}

export default SuprSendProvider
