'use client'

import { useRouter } from "next/navigation"

const Desc = ({problemURL}: {problemURL: string}) => {
    const router = useRouter()
  return (
    <div className="cursor-pointer hover:bg-[#404040] p-2 rounded-md font-semibold text-lg font-sans"
        onClick={()=> {
            router.push(`/problems/${problemURL}`)
        }}
    >
          <div className="flex gap-1 items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#007bff"} fill={"none"}>
              <path d="M16.5 19.8571V21M16.5 19.8571C15.4878 19.8571 14.5961 19.3521 14.073 18.5852M16.5 19.8571C17.5122 19.8571 18.4039 19.3521 18.927 18.5852M16.5 14.1429C17.5123 14.1429 18.4041 14.648 18.9271 15.415M16.5 14.1429C15.4877 14.1429 14.5959 14.648 14.0729 15.415M16.5 14.1429V13M20 14.7143L18.9271 15.415M13.0004 19.2857L14.073 18.5852M13 14.7143L14.0729 15.415M19.9996 19.2857L18.927 18.5852M18.9271 15.415C19.2364 15.8685 19.4167 16.4136 19.4167 17C19.4167 17.5864 19.2363 18.1316 18.927 18.5852M14.0729 15.415C13.7636 15.8685 13.5833 16.4136 13.5833 17C13.5833 17.5864 13.7637 18.1316 14.073 18.5852" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 3H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 9H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              <path d="M4 15H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <div>
              Description
            </div>
          </div>
        </div>
  )
}

export default Desc
