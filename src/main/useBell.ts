import useNotifications from './useNotifications'

export default function useBell() {
  const { unSeenCount, markAllSeen } = useNotifications()

  return { unSeenCount, markAllSeen }
}
