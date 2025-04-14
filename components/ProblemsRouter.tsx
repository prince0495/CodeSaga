'use client'
import { useRouter } from 'next/navigation'

const Problems = () => {
    const router = useRouter()
  return (
    <div
    onClick={()=> router.push('/problems')
    }>
        Problems
    </div>
  )
}

export default Problems
