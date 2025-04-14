'use client'
import { useRouter } from 'next/navigation'

const GettingStartedRoute = () => {
    const router = useRouter()
  return (
    <div
    className="rounded-lg cursor-pointer whitespace-nowrap"    
    onClick={()=> router.push('/getting-started')
    }>
      Getting Started
    </div>
  )
}

export default GettingStartedRoute
