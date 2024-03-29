import AsyncStorage from '@react-native-async-storage/async-storage'
import crypto from 'crypto-js'
import { useConfigStore } from './store'

export function utcNow() {
  return new Date().toUTCString()
}

export function epochNow() {
  return Math.round(Date.now())
}

export function uuid() {
  var dt = new Date().getTime()
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    }
  )
  return uuid
}

interface ISignature {
  workspaceSecret: string
  date: string
  method: string
  route: string
  body?: string
  contentType?: string
}

export function createSignature({
  workspaceSecret,
  route,
  body = '',
  method,
  contentType = '',
  date
}: ISignature) {
  const md5 = body ? crypto.MD5(body).toString() : ''
  const message = `${method}\n${md5}\n${contentType}\n${date}\n${route}`
  const hmac = crypto.HmacSHA256(message, workspaceSecret)
  return crypto.enc.Base64.stringify(hmac)
}

export async function setStorage(key: string, value: string) {
  try {
    await AsyncStorage.setItem(key, value)
  } catch (e) {
    console.log('Error setting in storage')
  }
}

export async function getStorage(key: string) {
  let value
  try {
    value = await AsyncStorage.getItem(key)
  } catch (e) {
    console.log('Error getting in storage')
  }
  return value
}

export function getStorageKey(key: string) {
  let newStr = ''
  for (let i = 0; i < key.length; i = i + 2) {
    newStr += key[i].toLowerCase()
  }
  return `_suprsend_inbox_${newStr}`
}

export async function getClientNotificationStorage(workspaceKey?: string) {
  const currentWorkspaceKey =
    workspaceKey || useConfigStore.getState().workspaceKey
  const storageKey = getStorageKey(currentWorkspaceKey)
  const value = await getStorage(storageKey)
  const jsonValue = value ? JSON.parse(value) : {}
  return jsonValue
}

export async function setClientNotificationStorage(value: object) {
  const workspaceKey = useConfigStore.getState().workspaceKey
  const storageKey = getStorageKey(workspaceKey)
  const jsonValue = JSON.stringify(value)
  await setStorage(storageKey, jsonValue)
}
