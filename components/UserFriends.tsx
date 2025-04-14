"use client";

import { FriendsMap, useUser } from "@/lib/store";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const UserFriends = () => {
  const friends: FriendsMap = useUser((state) => state.friends);
  const user = useUser(state=>state.user)
  const deleteFriend = useUser(state=>state.deleteFriend)
  const router = useRouter()

  const removeFriend = async(requesterId: string) => {
    if(user) {
      const res = await axios.post(`/api/friends/remove/${user.id}`, {requesterId: requesterId});
      if(res.data?.error) {
        console.log(res.data.error);
        alert('Something went wrong')
      }
      else {
        if(res.data?.message) {
          console.log(res.data.message);
          deleteFriend(requesterId)
        }
      }
    }
  }

  return (
    <div className="w-full h-[calc(100vh-8rem)] overflow-y-auto p-4 flex flex-col gap-4">
      {Object.keys(friends).length > 0 ? (
        Object.entries(friends).map(([friendId, friend]) => (
          <div
            key={friendId}
            className="bg-[#222222] p-3 rounded-lg flex items-center gap-3 shadow-md hover:bg-[#303030] transition w-full"
          >
            <Image
              src={friend.image}
              alt={friend.name}
              width={40}
              height={40}
              className="rounded-full border-2 border-[#555555] shrink-0 hover:cursor-pointer"
              onClick={()=> {
                router.push(`/friends/${friendId}`)
              }}
            />
            <div className="flex-1">
              <p className="text-white font-medium">{friend.name}</p>
            </div>
            <button 
              onClick={() => {
                removeFriend(friendId)                
              }} 
              className="ml-auto text-[#888888] hover:text-red-500 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
            </svg>
          </button>
        </div>

        ))
      ) : (
        <p className="text-gray-400 text-center w-full">No friends found.</p>
      )}
    </div>
  );
};

export default UserFriends;
