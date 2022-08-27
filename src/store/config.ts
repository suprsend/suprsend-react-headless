import create from 'zustand'
import { IConfigStore } from '../types'

const useConfigStore = create<IConfigStore>(() => ({
  workspaceKey: '',
  workspaceSecret: '',
  distinctId: '',
  subscriberId: '',
  apiUrl: 'https://hub.suprsend.com',
  pollingInterval: 20 * 1000,
  batchSize: 20,
  batchTimeInterval: 30 * 24 * 60 * 60 * 1000 // in ms
}))

export default useConfigStore
