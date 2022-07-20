import AsyncStorage from '@react-native-async-storage/async-storage'

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

export function createSignature({
  workspaceSecret,
  date,
  method,
  body,
  route,
  contentType
}: {
  workspaceSecret: string
  date: string
  method: string
  body?: string
  route: string
  contentType?: string
}) {
  console.log(workspaceSecret, date, method, route, body, contentType)
  return ''
}

export async function setStorage(key: string, value: object) {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem(key, jsonValue)
  } catch (e) {
    console.log('Error setting in storage')
  }
}

export async function getStorage(key: string) {
  let value
  try {
    const stringValue: string | null = await AsyncStorage.getItem(key)
    value = stringValue ? JSON.parse(stringValue) : null
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
