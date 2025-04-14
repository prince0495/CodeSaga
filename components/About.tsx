'use client'
import { useRouter } from "next/navigation"

const AboutUs = () => {
    const router = useRouter()
  return (
    <div
    className="rounded-lg cursor-pointer whitespace-nowrap"
    onClick={()=> router.push('/about-us')}>
        Contact Us
    </div>
  )
}

export default AboutUs
