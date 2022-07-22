import mitt from 'mitt'
import { useEffect } from 'react'

export const suprSendEmitter = mitt()

export default function useEvent(
  eventName: string,
  callback: (data: unknown) => void
) {
  useEffect(() => {
    suprSendEmitter.on(eventName, callback)
  }, [])
}
