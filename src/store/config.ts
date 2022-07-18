import create from 'zustand'
import { IConfigStore } from '../types'

const useConfigStore = create<IConfigStore>(() => ({
  workspaceKey: '',
  workspaceSecret: '',
  distinctId: '',
  subscriberId: '',
  apiUrl: 'https://collector-staging.suprsend.workers.dev',
  pollingInterval: 20 * 1000
}))

export default useConfigStore
