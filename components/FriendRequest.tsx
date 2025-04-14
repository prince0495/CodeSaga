"use client"

import { FriendsMap, useUser } from "@/lib/store"
import Image from "next/image"
import { Check, X } from "lucide-react"
import axios from "axios"

const FriendRequest = () => {
  const friendRequests: FriendsMap = useUser(state => state.friendRequests)
  const user = useUser(state=>state.user)
  const deleteFriendRequest = useUser(state=>state.deleteFriendRequest)
  const addFriends = useUser(state=>state.addFriends)
  
  const acceptRequest = async(requesterId: string) => {
    if(user) {
      const res = await axios.post(`/api/friends/acceptRequest/${user.id}`, {requesterId: requesterId, accepterName: user.name})
      if(res.data && res.data?.error) {
        console.log(res.data.error);
        alert('Something went wrong')
      }
      else if(res.data?.message) {
        alert(res.data.message)
        deleteFriendRequest(requesterId)
      }
      else {
        console.log(res.data);
        /*
        {id: 'f628dd34-3137-48ec-82dc-809902259714', requesterId: '104302445703045574162', recipientId: '104448331189793380096', status: 'Accepted', createdAt: '2025-03-29T08:01:09.852Z', …}
        */

        deleteFriendRequest(requesterId)
        if(res.data?.requester) {
          addFriends(requesterId, {name: res.data.requester.name, image: res.data.requester.image})
        }
      }
    }
  }
  const rejectRequest = async (requesterId: string) => {
    if(user) {
      const res = await axios.post(`/api/friends/rejectRequest/${user.id}`, {requesterId: requesterId});
      if(res.data?.message) {
        if(res.data.message.includes('successfully')) {
          
        }
        else {
          alert(res.data.message)
        }
        deleteFriendRequest(requesterId)
      }
      else {
        alert('Something went wrong')
      }
    }
  }
  return (
    <div className="w-full h-[calc(100vh-8rem)] overflow-y-auto p-4 flex flex-col gap-4 items-center">
      {Object.keys(friendRequests).length > 0 ? (
        Object.entries(friendRequests).map(([requesterId, request]) => (
          <div
            key={requesterId}
            className="bg-[#222222] p-4 rounded-lg shadow-lg hover:bg-[#303030] transition w-full max-w-md flex items-center gap-4"
          >
            <Image
              src={request.image}
              alt={request.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-[#555555]"
            />
            <div className="flex-1">
              <p className="text-white font-medium">{request.name}</p>
              <p className="text-gray-400 text-sm">Sent you a friend request</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  acceptRequest(requesterId)
                }}
                className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition"
              >
                <Check size={20} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  rejectRequest(requesterId)
                }}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center w-full">No friend requests found.</p>
      )}
    </div>
  );

}

export default FriendRequest
