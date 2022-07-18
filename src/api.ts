import { utcNow, uuid, epochNow, createSignature } from './utils'
import { useConfigStore } from './store'

export async function getNotifications(after: number) {
  const { apiUrl, workspaceKey, workspaceSecret, subscriberId, distinctId } =
    useConfigStore.getState()
  const date = utcNow()
  const route = `/inbox/fetch/?subscriber_id=${subscriberId}&after=${after}&distinct_id=${distinctId}`
  const signature = await createSignature({
    workspaceSecret,
    date,
    method: 'GET',
    route
  })
  return fetch(`${apiUrl}${route}`, {
    method: 'GET',
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': date
    }
  })
}

export function markNotificationClicked(id: string) {
  const { apiUrl, workspaceKey } = useConfigStore.getState()
  const body = {
    event: '$notification_clicked',
    env: workspaceKey,
    $insert_id: uuid(),
    $time: epochNow(),
    properties: { id }
  }
  return fetch(`${apiUrl}/event/`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'x-amz-date': utcNow()
    }
  })
}

export async function markBellClicked() {
  const { apiUrl, workspaceKey, workspaceSecret, subscriberId, distinctId } =
    useConfigStore.getState()
  const date = utcNow()
  const route = '/inbox/bell-clicked/'
  const body = JSON.stringify({
    time: epochNow(),
    distinct_id: distinctId,
    subscriber_id: subscriberId
  })
  const signature = await createSignature({
    workspaceSecret,
    date,
    route,
    method: 'POST',
    contentType: 'application/json',
    body
  })
  return window.fetch(`${apiUrl}${route}`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `${workspaceKey}:${signature}`,
      'x-amz-date': date
    }
  })
}
