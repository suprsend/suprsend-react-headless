import React from 'react'
import { useConfigStore } from '../store'

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
  useConfigStore((store) => ({
    ...store,
    workspaceKey: workspaceKey,
    workspaceSecret: workspaceSecret,
    distinctId: distinctId,
    subscriberId: subscriberId
  }))
  return <>{children}</>
}

export default SuprSendProvider
