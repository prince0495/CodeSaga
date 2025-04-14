'use client'

import Image from "next/image";
import { useRouter } from "next/navigation"
const ProblemNavIcon = () => {
    const router = useRouter();
  return (
    <div className="flex-1 text-white text-xl sm:ml-8 mr-auto cursor-pointer"
          onClick={()=>{
            router.push('/problems')
          }}
        > 
          <Image src="/CodeSagaLogo.png" alt="Logo" width={50} height={50}/>
        </div  >
  )
}

export default ProblemNavIcon
