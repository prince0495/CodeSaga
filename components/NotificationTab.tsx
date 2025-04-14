'use client'

import { useUser } from "@/lib/store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect } from "react"
import dayjs from "dayjs"

export type NotificationType = {
  userId: string,
  createdAt: string,
  message: string,
}

const NotificationTab = () => {
  const session = useSession()
  const notifications = useUser(state => state.notifications)
  const setNotifications = useUser(state => state.setNotifications)

  useEffect(() => {
    async function getNotifications() {
      if (session.data?.user && !notifications) {
        // @ts-expect-error
        const res = await axios.get('/api/notifications/' + session.data.user.id)
        if (res.data?.notifications) {
          setNotifications(res.data.notifications)
        }
      }
    }
    getNotifications()
  }, [session, notifications, setNotifications])

  return (
    <div className="w-full max-w-md mx-auto p-4 bg-[#1a1a1a] rounded-2xl shadow-md border border-[#2a2a2a] max-h-[60vh]">
      {!notifications ? (
        <p className="text-gray-500 text-sm text-center">Loading...</p>
      ) : notifications.length === 0 ? (
        <p className="text-gray-500 text-sm text-center">No notifications yet.</p>
      ) : (
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {notifications.map((notification, idx) => (
            <div
              key={idx}
              className="bg-[#2a2a2a] p-3 rounded-xl shadow-sm border border-[#3a3a3a] hover:bg-[#333] transition-colors duration-200"
            >
              <p className="text-gray-200 text-sm">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {dayjs(notification.createdAt).format('MMM D, YYYY h:mm A')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default NotificationTab
