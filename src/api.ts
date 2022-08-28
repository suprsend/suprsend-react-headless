import { utcNow, uuid, epochNow, createSignature } from './utils'
import { useConfigStore } from './store'

export function getNotifications(after: number, before?: number) {
  const { apiUrl, workspaceKey, workspaceSecret, subscriberId, distinctId } =
    useConfigStore.getState()
  const date = utcNow()
  const route = `/fetch/?subscriber_id=${subscriberId}&after=${after}&distinct_id=${distinctId}`
  const fullRoute = before ? `${route}&before=${before}` : route
  const signature = createSignature({
    workspaceSecret,
    date,
    method: 'GET',
    route: fullRoute
  })
  return fetch(`${apiUrl}${fullRoute}`, {
    method: 'GET',
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': date
    }
  })
}

export function markNotificationClicked(id: string) {
  const { collectorApiUrl, workspaceKey } = useConfigStore.getState()
  const body = {
    event: '$notification_clicked',
    env: workspaceKey,
    $insert_id: uuid(),
    $time: epochNow(),
    properties: { id }
  }
  return fetch(`${collectorApiUrl}/event/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-amz-date': utcNow()
    }
  })
}

export function markBellClicked() {
  const { apiUrl, workspaceKey, workspaceSecret, subscriberId, distinctId } =
    useConfigStore.getState()
  const date = utcNow()
  const route = '/bell-clicked/'
  const body = JSON.stringify({
    time: epochNow(),
    distinct_id: distinctId,
    subscriber_id: subscriberId
  })
  const signature = createSignature({
    workspaceSecret,
    date,
    route,
    method: 'POST',
    contentType: 'application/json',
    body
  })
  return fetch(`${apiUrl}${route}`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'Content-Type': 'application/json',
      'x-amz-date': date
    }
  })
}
