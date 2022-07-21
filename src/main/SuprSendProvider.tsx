import React, { useEffect } from 'react'
import { useConfigStore, useNotificationStore } from '../store'
import { getStorageKey, getStorage } from '../utils'

interface ISuprSendProviderProps {
  workspaceKey: string
  workspaceSecret: string
  distinctId: string
  subscriberId: string
  children: React.ReactElement | React.ReactElement[]
}

function SuprSendProvider({
  children,
  workspaceKey,
  workspaceSecret,
  distinctId,
  subscriberId
}: ISuprSendProviderProps): JSX.Element {
  const storageKey = getStorageKey(workspaceKey)

  async function handleSubscriberChange() {
    const storedData = (await getStorage(storageKey)) || {}
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
  }

  useEffect(() => {
    handleSubscriberChange()
    return () => {
      useNotificationStore.getState().clearPolling()
    }
  }, [subscriberId])

  return <React.Fragment>{children}</React.Fragment>
}

export default SuprSendProvider
