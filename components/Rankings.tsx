'use client'

import { useRouter } from "next/navigation"

const Rankings = () => {
    const router = useRouter()
  return (
    <div onClick={()=> router.push('/rankings')}>
      Rankings
    </div>
  )
}

export default Rankings
