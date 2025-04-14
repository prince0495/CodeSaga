import NavUserIcon from "@/components/NavUserIcon";
import ProblemNavIcon from "@/components/ProblemNavIcon";
import RunButton from "@/components/RunButton";
import SplitPage from "@/components/SplitPage";
import Stopwatch from "@/components/Stopwatch";
import { globalPrismaClient } from "@/lib/prisma";

export type Example = {
  id: string,
  input: string[],
  output: string,
  explanation: string[],
  imgSrc: string | null,
  problemId: string
}

export type ProblemInfo = {
  id: string,
  description: string[],
  examples: Example[],
  difficulty: string,
  title: string,
  imgSrc: string | null,
  problemURL: string,
  topics: string[],
  hints: string[],
}

async function getProblemInfo(problemURL: string) {
  const prisma = globalPrismaClient;
  try {
    const problem = await prisma.problem.findUnique({
      where: {
        problemURL: problemURL
      }, 
      select: {
        id: true,
        description: true,
        examples: {
          select: {
            id: true,
            input: true,
            output: true,
            explanation: true,
            imgSrc: true,
            problemId: true
          }
        },
        difficulty: true,
        title: true,
        imgSrc: true,
        problemURL: true,
        topics: true,
        hints: true,
      }
    })
    return problem;
  } catch (error) {
    alert(error)
    return null;
  }
}

const page = async({params}: {params: {slug: string[]}}) => {
  const param = await params;
  const problemURL = param.slug[0]
  const pageType = param.slug[1] ? param.slug[1] : 'description';
  const problemInfo = await getProblemInfo(problemURL);
  
  return (
    <div>
      {/* Navbar */}
        <div className="bg-[#0f0f0f] h-16 flex items-center p-3 justify-between">
        <ProblemNavIcon/>

            <div className="flex items-center justify-center gap-2 flex-none">
              <RunButton problemURL={problemURL} topics={problemInfo?.topics} />
              <Stopwatch/>
            </div>

            <div className="flex-1 flex justify-end items-center gap-10">
              <NavUserIcon />
              <div className="cursor-pointer items-center justify-center p-3 text-[#ffa600d1] rounded-xl bg-[#ffa60013] hidden c-664:block">
                Premium
              </div>
            </div>
        </div>

        <SplitPage problemInfo={problemInfo} pageType={pageType} problemURL={problemURL} />
    </div>
  )
}

export default page