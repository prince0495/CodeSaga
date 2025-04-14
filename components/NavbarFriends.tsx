'use client'

import { useRouter } from "next/navigation"

const NavbarFriends = () => {
    const router = useRouter()
  return (
    <div onClick={()=> router.push('/friends')}>
      Friends
    </div>
  )
}

export default NavbarFriends
