'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"

const NavLogo = () => {
    const router = useRouter()
  return (
    <div className="text-white text-xl ml-8 cursor-pointer hover:scale-105 transition duration-300 ease-in-out"
        onClick={()=>router.push('/')}
    >
        <Image src="/CodeSagaLogo.png" alt="Logo" width={50} height={50}/>
    </div>
  )
}

export default NavLogo
