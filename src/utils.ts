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
