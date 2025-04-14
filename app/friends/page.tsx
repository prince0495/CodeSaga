import GlobalUsers from "@/components/GlobalUsers"
import Navbar from "@/components/Navbar"

const page = () => {
  return (
    <div>
        <Navbar compName="friends" />
        <GlobalUsers/>
    </div>
  )
}

export default page