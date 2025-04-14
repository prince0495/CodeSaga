import Navbar from "@/components/Navbar"
import RankingsPage from "@/components/RankingsPage"

const page = () => {
  return (
    <div>
        <Navbar compName="rankings" />
        <RankingsPage/>
    </div>
  )
}

export default page