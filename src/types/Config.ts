export interface IUserConfig {
  workspaceKey: string
  workspaceSecret: string
  distinctId: string
  subscriberId: string
}

export interface IInternalConfig {
  apiUrl: string
  pollingInterval: number
  batchSize: number
  batchTimeInterval: number
}

export interface IConfigStore extends IUserConfig, IInternalConfig {}
