import ProbleamHeading from "./ProbleamHeading"
import ProblemDescription from "./ProblemDescription"
import ProblemNavbar from "./ProblemNavbar"
import { ProblemInfo } from "@/app/problems/[...slug]/page"
import Examples from "./Examples"
import { Example } from "@prisma/client"
import ProblemFooter from "./ProblemFooter"
import ProblemAcceptance from "./ProblemAcceptance"
import Topics from "./Topics"
import Hints from "./Hints"

const Problem = ({problemInfo, problemURL}: {problemInfo: ProblemInfo | null, problemURL: string}) => {
  if(!problemInfo) {
    return <div className="text-center text-white">Problem not found.</div>;
  }
  /*
  export type ProblemInfo = {
    id: string,
    totalSubmissions: number,/
    acceptedSubmissions: number,/
    boilerPlates: string[],/
  }
  
  */

  return (
    <div className="rounded-lg bg-[#262626] overflow-y-auto text-wrap">
        <ProblemNavbar problemURL={problemURL} />
        <div className="flex flex-col pt-4 pl-4 pr-4 my-3 gap-4  ">
          <ProbleamHeading title={problemInfo.title} difficulty={problemInfo.difficulty} problemURL={problemURL} />
          <ProblemDescription description={problemInfo.description} imgSrc={problemInfo.imgSrc} />
          <Examples examples={problemInfo.examples} />
        </div>
          <ProblemAcceptance problemURL={problemURL} />
          <div className="flex items-center justify-center">
            <div className="bg-[#333333] h-0.5 w-full mt-2 mb-2 ml-4 mr-4"></div>
          </div>
          <Topics topics={problemInfo.topics} />
          
          <Hints hints={problemInfo.hints} />
          <div className="pl-4 pr-4 text-[#aaaaaa] mb-6 mt-4">
            Copyright @2025 CodeSaga All rights reserved
          </div>
        <ProblemFooter problemURL={problemURL} />
        
    </div>
  )
}

export default Problem
