import React from 'react'
import { useConfigStore } from '../store'
import { IConfigStore } from '../types'

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
  // set config
  useConfigStore.setState((store: IConfigStore) => ({
    ...store,
    workspaceKey,
    workspaceSecret,
    distinctId,
    subscriberId
  }))

  return <React.Fragment>{children}</React.Fragment>
}

export default SuprSendProvider
