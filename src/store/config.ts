import create from 'zustand'
import { IConfigStore } from '../types'

const useConfigStore = create<IConfigStore>(() => ({
  workspaceKey: '',
  workspaceSecret: '',
  distinctId: '',
  subscriberId: '',
  collectorApiUrl: 'https://hub.suprsend.com',
  apiUrl: 'https://inboxs.live',
  pollingInterval: 20 * 1000,
  batchSize: 20,
  batchTimeInterval: 30 * 24 * 60 * 60 * 1000 // in ms
}))

export default useConfigStore
