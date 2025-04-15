'use client'
import { FilterUserType, useUser } from "@/lib/store";
import axios from "axios";
import { Search, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import RightFriends from "./RightFriends";
import { useRouter } from "next/navigation";


const GlobalUsers = () => {
  const [searchName, setSearchName] = useState("");
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const session = useSession();
  const user = useUser(state=>state.user);
  const setUser = useUser(state=>state.setUser);
  const allUsers = useUser(state=>state.allUsers);
  const setAllUsers = useUser(state=>state.setAllUsers)
  const friends = useUser(state=>state.friends)
  const addFriends = useUser(state=>state.addFriends)
  const addFriendRequest = useUser(state=>state.addFriendRequest)
  const [filteredUsers, setFilteredUsers] = useState<FilterUserType[] | null>(null)
  const router = useRouter()

  useEffect(() => {
    const getAllUser = async() => {
      if(user) {
        const res = await axios.get(`/api/friends/allusers/${user.id}`)
        console.log('all users, ',res.data);
        if(res.data && res.data?.length>0) {
          setAllUsers(res.data)
        }
      }
    }
    
  async function getUser() {
    if(!user && session.data && session.data?.user) {
      // @ts-expect-error: Not able to tell ts compiler that i provided it at runtime while signin otherwise user cannot reach here
      const res = await axios.get('/api/user/getUser/'+session.data.user.id);
      if(res.data && res.data?.id) {
        setUser(res.data)
      }
      else {
        console.log(res.data);
      }
    }
  }
  async function getAllFriends() {
    if(user) {
      const res = await axios.get(`/api/friends/getfriends/${user.id}`);
      if(!res.data?.message) {
        console.log('logged friends');
        console.log(res.data);
        for(const friendship of res.data) {
          if(friendship?.recipient && friendship?.recipient?.id === user.id) {
            // addFriends(friendship)
            if(friendship?.requester && friendship?.requester?.id) {
              addFriends(friendship.requester.id, {name: friendship.requester.name, image: friendship.requester.image})
            }
          }
          else {
            if(friendship?.recipient && friendship?.recipient?.id) {
              addFriends(friendship.recipient.id, {name: friendship.recipient.name, image: friendship.recipient.image})
            }
          }
        }
      }
    }
  }
  async function getFriendRequests() {
    if(user) {
      const res = await axios.get(`/api/friends/friendRequests/${user.id}`);
      if(!res.data?.message) {
        console.log('friend Requests : ');
        console.log(res.data);
        for(const friendship of res.data) {
          if(friendship?.requester) {
            addFriendRequest(friendship.requester.id, {name: friendship.requester.name, image: friendship.requester.image})
          }
        }
      }
    }
  }
    getUser()
    getAllFriends()
    getFriendRequests()
    getAllUser()
  }, [session, user, addFriendRequest, addFriends, setAllUsers, setUser])

  const getFilteredUsers = async() => {
    if(user && searchName.length > 0) {
      const res = await axios.post(`/api/friends/allusers/${user.id}`, {searchName})
      console.log('typing done .. ', res.data);
      if(res.data && res.data?.length >= 0) {
        console.log('set , ', res.data);
        
        setFilteredUsers(res.data)
      }
    }
  }

  async function sendFriendRequest(recipientId: string) {
    
    if(user) {      
      const res = await axios.post(`/api/friends/sendRequest/${user.id}`, {recipientId: recipientId, requesterName: user.name})
      if(res.data && !res.data?.message) {
        console.log('friend request sent ', res.data);
        if(res.data?.recipient) {
          console.log('recipient : ' ,res.data.recipient);
          addFriendRequest(res.data?.recipient.id, {name: res.data.recipient.name, image: res.data.recipient.image})
        }
      }
      else if(res.data?.message && res.data?.message.startsWith("Already")) {
          if(res.data?.status) {
            if(res.data.status === 'Pending') {
              alert('friend request was already sent to this user')
            }
            else {
              alert('already friend')
            }
          }
      }
      else {
        console.log(res.data);
      }
      
    }
  }

  const handleChange = (newName: string)=> {
    setSearchName(newName)
    if(typingTimeout.current) {
      clearTimeout(typingTimeout.current)
    }
    typingTimeout.current = setTimeout(()=> {
      getFilteredUsers();
    }, 1000)
  }
  return (
  <div className="h-[calc(100vh-4rem)] flex flex-col md:flex-row gap-2 pt-3 w-full px-5 select-none">
    <div className="bg-[#282828] w-full md:w-8/12 rounded-t-lg overflow-y-auto ">
  <div className="w-full h-full">
    {/* Search Bar */}
    <div className="bg-[#333333] h-12 flex items-center justify-center px-4 gap-4 top-0 w-full sticky overflow-hidden z-10">
      <div className="cursor-pointer p-2 rounded-md font-semibold text-lg font-sans text-white">
        {/* Your Icon or Branding */}
      </div>
      <div className="relative flex items-center w-full max-w-sm">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <input
          type="text"
          className="w-full bg-[#222222] text-white placeholder-gray-400 rounded-full pl-10 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#555555] transition-all"
          placeholder="Search for users..."
          value={searchName}
          onChange={(e) => handleChange(e.target.value)}
        />
        {searchName && (
          <button
            className="absolute right-3 text-gray-400 hover:text-white transition"
            onClick={() => setSearchName("")}
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>

    {/* Users List */}
    <div className="h-[calc(100vh-8rem)] overflow-y-auto ">
    <div className="p-4 flex flex-wrap gap-4 items-stretch justify-start">
  {allUsers?.length && searchName.length === 0 ? (
    allUsers.map((user) => (
      <div
        key={user.id}
        className="bg-[#222222] p-4 rounded-lg flex items-center gap-3 shadow-lg hover:bg-[#303030] transition w-full xs:w-[90%] sm:w-[48%] lg:w-[32%] relative"
      >
        <Image
          src={user.image}
          alt={user.name}
          width={40}
          height={40}
          className="rounded-full border-2 border-[#555555] hover:cursor-pointer"
          onClick={() => router.push(`/friends/${user.id}`)}
        />
        <span className="text-white font-medium flex-1">{user.name}</span>
        {!friends[user.id] && (
          <div className="relative group">
            <button
              className="hover:cursor-pointer"
              onClick={() => sendFriendRequest(user.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#ababab"
                fill="none"
              >
                <path
                  d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.5 22L18.5 15M15 18.5H22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="absolute left-1/2 transform -translate-x-1/2 bottom-7 text-sm text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Add Friend
            </span>
          </div>
        )}
      </div>
    ))
  ) :
    (filteredUsers?.length && searchName.length > 0) ? (
      filteredUsers.map((user) => (
        <div
          key={user.id}
          className="bg-[#222222] p-4 rounded-lg flex items-center gap-3 shadow-lg hover:bg-[#303030] transition w-full xs:w-[90%] sm:w-[48%] lg:w-[32%] relative"
        >
          <Image
            src={user.image}
            alt={user.name}
            width={40}
            height={40}
            className="rounded-full border-2 border-[#555555] hover:cursor-pointer"
            onClick={() => router.push(`/friends/${user.id}`)}
          />
          <span className="text-white font-medium flex-1">{user.name}</span>
          {!friends[user.id] && (
            <div className="relative group">
              <div
                className="hover:cursor-pointer"
                onClick={() => sendFriendRequest(user.id)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  color="#ababab"
                  fill="none"
                >
                  <path
                    d="M13.5 16.0001V14.0623C15.2808 12.6685 16.5 11 16.5 7.41681C16.5 5.09719 16.0769 3 13.5385 3C13.5385 3 12.6433 2 10.4923 2C7.45474 2 5.5 3.82696 5.5 7.41681C5.5 11 6.71916 12.6686 8.5 14.0623V16.0001L4.78401 17.1179C3.39659 17.5424 2.36593 18.6554 2.02375 20.0101C1.88845 20.5457 2.35107 21.0001 2.90639 21.0001H13.0936"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.5 22L18.5 15M15 18.5H22"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="absolute left-1/2 transform -translate-x-1/2 bottom-7 text-sm text-white bg-gray-800 px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Add Friend
              </span>
            </div>
          )}
        </div>
      ))
    ) : 
  (
    <p className="text-gray-400 text-center w-full">No users found.</p>
  )}
    </div>
    </div>

  </div>
</div>

    <div className="bg-[#282828] w-full md:w-4/12 rounded-t-lg overflow-y-auto">
      <RightFriends />
    </div>
  </div>
)

}

export default GlobalUsers
