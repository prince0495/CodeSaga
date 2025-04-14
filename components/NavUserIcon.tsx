"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/lib/store";
import axios from "axios";
import Image from "next/image";

const NavUserIcon = () => {
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); 
  const user = useUser(state=>state.user)
  const setUser = useUser(state=>state.setUser)
  const router = useRouter()

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); 
  useEffect(() => {
    async function getUserDetails() {
      if(!user) {
        if(session.data && session.data?.user) {
          // @ts-expect-error:Not able to tell ts compiler that i provided it at runtime while signin otherwise user cannot reach here
            const res = await axios.get('/api/user/getUser/'+session.data.user.id);
            if(res.data) {
              if(res.data?.id) {
                  setUser(res.data)
              }
              else {
                  console.log(res.data);
              }
            }
        }
      }
    }
    getUserDetails()
  }, [session, setUser, user])
  
  return (
    <div>
      {session.status === "authenticated" && user ? (
        <div className="relative flex items-center">
          <div className="hidden cm:flex text-[#cbcbcbd1] items-center gap-2 p-3 ">{user.name}</div>

          {/* Profile Image */}
          <div className="cursor-pointer relative" onClick={() => setIsOpen(!isOpen)}>
            <Image
              className="w-10 h-10 rounded-full border-2 border-[#ffa500] hover:scale-105 transition duration-300"
              src={user.image}
              alt="User Pic"
              width={40}
              height={40}
            />
            
            
          </div>


          {/* Dropdown Menu */}
          {isOpen && (
            <div
              ref={dropdownRef}
              className="absolute z-20 top-14 right-0 w-36 bg-[#1c1c1c] border border-[#4d4d4d] rounded-lg shadow-lg text-white p-2"
            >
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#303030] rounded-lg transition duration-300"
                onClick={() => {
                  router.push('/profile')
                }}
              >
                Profile
              </button>
              <button
                className="block w-full text-left px-4 py-2 hover:bg-[#ff4444c4] hover:text-white rounded-lg transition duration-300"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      ) : ((session.status === 'authenticated' && !user) || session.status === "loading") ? (
        // Skeleton Loader
        <div className="flex items-center gap-2 p-3 h-[3rem]">
          <div className="w-20 h-4 bg-[#303030] animate-pulse rounded"></div>
          <div className="w-10 h-10 bg-[#303030] animate-pulse rounded-full"></div>
        </div>
      ) : (
        <div
          className="flex text-[#cbcbcbd1] items-center justify-center p-3 cursor-pointer hover:text-[#cfcfcf] gap-2"
          onClick={() => signIn()}
        >
          Sign up
          <div className="flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              color={"#cbcbcbd1"}
              fill={"none"}
            >
              <path
                d="M7.78256 17.1112C6.68218 17.743 3.79706 19.0331 5.55429 20.6474C6.41269 21.436 7.36872 22 8.57068 22H15.4293C16.6313 22 17.5873 21.436 18.4457 20.6474C20.2029 19.0331 17.3178 17.743 16.2174 17.1112C13.6371 15.6296 10.3629 15.6296 7.78256 17.1112Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15.5 10C15.5 11.933 13.933 13.5 12 13.5C10.067 13.5 8.5 11.933 8.5 10C8.5 8.067 10.067 6.5 12 6.5C13.933 6.5 15.5 8.067 15.5 10Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M2.854 16C2.30501 14.7664 2 13.401 2 11.9646C2 6.46129 6.47715 2 12 2C17.5228 2 22 6.46129 22 11.9646C22 13.401 21.695 14.7664 21.146 16"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavUserIcon;
