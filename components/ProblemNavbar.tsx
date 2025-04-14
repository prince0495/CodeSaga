import Desc from "./Desc"
import Sub from "./Sub"
import Tes from "./Tes"

const ProblemNavbar = ({problemURL}: {problemURL: string}) => {
  return (
    <div className="bg-[#333333] h-12 flex items-center justify-start px-5 gap-4 top-0 w-full sticky">
        <Desc problemURL={problemURL} />
        <div>
          <div className="h-7 w-1 bg-zinc-700"></div>
        </div>
        <Sub problemURL={problemURL}  />
        <div>
          <div className="h-7 w-1 bg-zinc-700"></div>
        </div>
        <Tes problemURL={problemURL} />
    </div>
  )
}

export default ProblemNavbar
