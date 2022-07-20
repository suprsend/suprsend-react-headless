import React, { useEffect } from 'react'
import { useConfigStore, useNotificationStore } from '../store'
import { IConfigStore, INotificationStore } from '../types'
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

  // set config
  useConfigStore.setState((store: IConfigStore) => ({
    ...store,
    workspaceKey,
    workspaceSecret,
    distinctId,
    subscriberId
  }))

  async function handleData() {
    const storedData = await getStorage(storageKey)
    if (!storedData) return
    if (storedData.subscriberId === subscriberId) {
      useNotificationStore.setState((store: INotificationStore) => ({
        ...store,
        notifications: storedData.notifications
      }))
    }
  }

  useEffect(() => {
    handleData()
  }, [subscriberId])

  return <React.Fragment>{children}</React.Fragment>
}

export default SuprSendProvider
