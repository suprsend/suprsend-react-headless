import create from 'zustand'

export interface IConfigStore {
  workspaceKey: string
  workspaceSecret: string
  distinctId: string
  subscriberId: string
  apiUrl: string
  pollingInterval: number
}

const useConfigStore = create<IConfigStore>(() => ({
  workspaceKey: '',
  workspaceSecret: '',
  distinctId: '',
  subscriberId: '',
  apiUrl: 'https://hub.suprsend.com',
  pollingInterval: 20 * 1000
}))

export default useConfigStore
