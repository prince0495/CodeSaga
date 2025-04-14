"use client"

import { useProblemsData } from "@/lib/store"
import axios from "axios"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

const IsSolved = ({problemURL}: {problemURL: string}) => {
  const [isSolved, setIsSolved] = useState(false)
  const problemsStatus = useProblemsData(state=>state.problemsStatus)
  const session = useSession()
  useEffect(() => {
    if(!problemsStatus.has(problemURL)) {
      async function getSolvedStatus() {
        // @ts-expect-error
        if(session && session.data && session.data.user && session.data.user.id) {
          // @ts-expect-error
          const res = await axios.get(`/api/getSolvedStatus/${session.data.user.id}/${problemURL}`)
          const solved = res.data?.isSolved
          if(solved) {
            setIsSolved(true)
          }
        }
      }
      getSolvedStatus()
    } 
  }, [session, problemsStatus])
  
  return (
    <div>
      <div className='text-[#aaaaaa] font-semibold'>{problemsStatus.has(problemURL) || isSolved ? (
        <div className="flex items-center justify-center gap-2">
          Solved
          <div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" width="1em" height="1em" fill="none" className="fill-none stroke-current text-message-success">
  <path stroke="#28c244" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" d="M12.598 7a5.6 5.6 0 11-3.15-5.037m2.1 1.537l-4.9 4.9-1.4-1.4"></path>
</svg>
    </div>
      </div>) : ''}</div>
    </div>
  )
}

export default IsSolved
