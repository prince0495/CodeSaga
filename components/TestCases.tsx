
"use client"
import { Example } from "@prisma/client"
import ProblemNavbar from "./ProblemNavbar"
import { useRunCallbackStore } from "@/lib/store"

const TestCases = ({ problemURL, examples }: { problemURL: string; examples: Example[] }) => {
  const runResponse = useRunCallbackStore((state) => state.runResponse);
  const responseLoading = useRunCallbackStore((state) => state.responseLoading);
  let isAccepted = false;
  let passed = 0;
  if(runResponse) {
    if(runResponse.status.includes('Accepted')) {
      passed = 10e9;
      isAccepted = true;
    }
    else if(runResponse.status.includes("Wrong Answer")) {
      const str = runResponse.status.split(": ")[1];
      passed = parseInt(str.split('/')[0])
      if(passed >= examples.length) {
        isAccepted = true;
      }
    }
  }

  return (
    <div className="rounded-lg bg-[#262626] overflow-auto">
      {responseLoading ? (<div className="rounded-lg bg-[#262626] overflow-auto animate-pulse">
      <div className="h-12 bg-[#404040] rounded-md w-3/3 mx-4 my-4"></div>
      <div className="p-4 flex flex-col gap-5">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="h-6 w-24 bg-[#404040] rounded-md"></div>
              <div className="h-6 w-20 bg-[#404040] rounded-md"></div>
            </div>
            <div className="flex flex-col gap-2">
              {[...Array(2)].map((_, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="h-4 w-32 bg-[#404040] rounded-md"></div>
                  <div className="h-8 bg-[#404040] rounded-md"></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>)
:      (
  <div className="rounded-lg bg-[#262626] overflow-auto min-h-[90vh]">
    {(!runResponse || runResponse.status.includes('Accepted') || runResponse.status.includes('Wrong Answer')) ? 
    <div>
        <ProblemNavbar problemURL={problemURL} />
        <div className="p-4 flex flex-col gap-5">
          {examples.map((example, index) => (
            <div key={index} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center px-5 hover:bg-[#404040] p-2 gap-3 rounded-md">
                  <span className="text-xl rounded-md cursor-pointer text-center">
                    Case {index + 1}
                  </span>
                  {runResponse && (index+1 > passed ? (<div className="w-1 h-1 rounded-full bg-[#ff375f]"></div>) : (<div className="w-1 h-1 rounded-full bg-[#28c244]"></div>))}       
                </div>
                {runResponse && index === 0 && (
                  <div className={`text-xl px-5 bg-[#404040] p-2 rounded-md cursor-pointer ${ isAccepted ? 'text-[#28c244]' : 'text-[#ff375f]'} font-semibold`}>
                    {isAccepted ? "Accepted" : "Wrong Answer"}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2">
                {example.input.map((input, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="text-[#9ea0a3]">{input.split(" = ")[0]} = </div>
                    <div className="p-2 bg-[#404040] rounded-md">{input.split(" = ")[1]}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      : <div className="rounded-lg bg-[#262626] overflow-hidden min-h-[90vh]">
          <ProblemNavbar problemURL={problemURL} />
          <div className="p-4 flex flex-col gap-5">
          <span className="text-xl px-5 bg-[#404040] p-2 rounded-md cursor-pointer text-[#ff375f]">
            {runResponse.status.includes('Compilation Error') ? "Compilation Error" : (runResponse.status.includes('TLE') ? "Time Limit Reached" : (runResponse.status.includes('Runtime Error')) ? 'Runtime Error' : runResponse.status)}
          </span>
          {runResponse.status.startsWith('Compilation Error') && 
            <div className="text-[#aaaaaa] text-xl px-5 bg-[#404040] p-4 rounded-md">
              {runResponse.status.split(':')[1]}
            </div>
          }
          </div>
    </div>
      }
  </div>
      )
      }
    </div>
  );
};

export default TestCases;
