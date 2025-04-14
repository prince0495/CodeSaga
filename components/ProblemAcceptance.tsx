'use client'

import { useProblemsData } from "@/lib/store"
import axios from "axios"
import { useEffect } from "react"

const ProblemAcceptance = ({problemURL}: {problemURL: string}) => {
  const acceptanceRateMap = useProblemsData(state=>state.acceptanceRateMap)
  const addAcceptanceRate = useProblemsData(state=>state.addAcceptanceRate)

  useEffect(() => {
    async function getAcceptance() {
      if(!acceptanceRateMap[problemURL]) {
        const res = await axios.get('/api/problems/'+problemURL);
        if(res.data?.acceptedSubmissions) {
          addAcceptanceRate(problemURL, {acceptedSubmissions: res.data.acceptedSubmissions, totalSubmissions: res.data.totalSubmissions})
        }
        else {
          console.log(res.data);
        }
      }
    }
    getAcceptance()
  }, [acceptanceRateMap, addAcceptanceRate, problemURL])
  
  
  return (
    <div>
      {acceptanceRateMap[problemURL] ? <div className="flex justify-between w-full text-nowrap gap-2 pl-4 pr-4 mt-4">
        <div className="flex gap-5 items-center justify-between">
          <div className="text-[#aaaaaa]">Accepted</div>
          <div className="font-semibold text-lg">{acceptanceRateMap[problemURL].acceptedSubmissions}</div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div className="text-[#aaaaaa]">Submissions</div>
          <div className="font-semibold text-lg">{acceptanceRateMap[problemURL].totalSubmissions}</div>
        </div>
        <div className="flex gap-5 items-center justify-between">
          <div className="text-[#aaaaaa]">Acceptance Rate</div>
          <div className="font-semibold text-lg">{acceptanceRateMap[problemURL].totalSubmissions === 0 ? 0 : ((acceptanceRateMap[problemURL].acceptedSubmissions/acceptanceRateMap[problemURL].totalSubmissions)*100).toFixed(2)} %</div>
        </div>
      </div>
    : (<div className="flex justify-between w-full text-nowrap gap-2 pl-4 pr-4 mt-4">
      {[...Array(3)].map((_, idx) => (
        <div key={idx} className="flex gap-5 items-center justify-between">
          <div className="w-24 h-4 rounded bg-[#303030]" />
          <div className="w-10 h-6 rounded bg-[#303030]" />
        </div>
      ))}
    </div>)  
    }
    </div>
  )
}

export default ProblemAcceptance
