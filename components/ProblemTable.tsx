"use client"
import React, { useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { FilteredProblems } from "./ProblemsPage";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";
import { useProblemsData } from "@/lib/store";

interface ProblemTableProps {
  problems: FilteredProblems[];
  currentPage: number;
  totalPages: number;
  problemsPerPage: number;
}
export type acceptanceRateProp = {
  acceptedSubmissions: number,
  totalSubmissions: number
}

const ProblemTable: React.FC<ProblemTableProps> = ({
  problems,
  currentPage,
  totalPages,
  problemsPerPage
}) => {
  const router = useRouter();
  const session = useSession()
  const problemsStatus = useProblemsData(state=>state.problemsStatus)
  const setProblemsStatus = useProblemsData(state=>state.setProblemsStatus)
  const acceptanceRateMap = useProblemsData(state=>state.acceptanceRateMap)
  const addAcceptanceRate = useProblemsData(state=>state.addAcceptanceRate)
  const problemsDifficultyMap = useProblemsData(state=>state.problemsDifficultyMap)
  const addProblemsDifficulty = useProblemsData(state=>state.addProblemsDifficulty)
  
  const handlePageChange = (page: number) => {
    router.push(`/problems?page=${page}`)
  };

  useEffect(() => {
    async function getStatus() {
      console.log('called getStatus');
      if(session.status === 'authenticated') {
        // @ts-expect-error:Not able to tell ts compiler that i provided it at runtime while signin otherwise user cannot reach here
        const res = await axios.get(`/api/getStatus/${session.data?.user.id}`)    
        if(res.data.solvedProblems) {
          setProblemsStatus(new Set<string>(res.data.solvedProblems))
        }  
        
      }
    }
    getStatus();
    
  }, [session, setProblemsStatus]);
  useEffect(() => {
    async function getSubmissions() {
      const res = await axios.get(`/api/getAcceptance/${currentPage}/${problemsPerPage}`)
      if(res.data && res.data?.problems) {
        console.log('adding acceptance rate for : ',res.data.problems);
        
        for(const p of res.data.problems) {
          addAcceptanceRate(p.problemURL, {totalSubmissions: p.totalSubmissions , acceptedSubmissions: p.acceptedSubmissions})
        }
        
      }
    }
    getSubmissions();
    
    problems.forEach(problem => {
      if (!problemsDifficultyMap[problem.problemURL]) {
        addProblemsDifficulty(problem.problemURL, problem.difficulty);
      }
    });
  }, [problems, addAcceptanceRate, addProblemsDifficulty, currentPage, problemsDifficultyMap, problemsPerPage])
  
  

  return (
    <div className="w-full max-w-5xl mx-auto p-3 bg-[#1c1c1c] rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full text-left text-white border-separate border-spacing-y-1 text-xs sm:text-sm overflow-x-auto">
        <thead>
          <tr className="text-gray-400">
            <th className="p-2">Status</th>
            <th className="p-2">Title</th>
            <th className="p-2">Acceptance</th>
            <th className="p-2">Difficulty</th>
            <th className="p-2">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem, index) => {
            const acceptancePercentage = acceptanceRateMap && acceptanceRateMap[problem.problemURL] && acceptanceRateMap[problem.problemURL].totalSubmissions > 0 ? ((acceptanceRateMap[problem.problemURL].acceptedSubmissions/acceptanceRateMap[problem.problemURL].totalSubmissions)*100).toFixed(2) : 'N/A';
          return (
            <tr
              key={index}
              className={`${
                index % 2 === 0 ? "bg-[#151515]" : "bg-[#303030]"
              } rounded-lg`}
            >
              <td className="p-1 flex items-center gap-1 sm:gap-2 sm:p-2">
                {problemsStatus.has(problem.problemURL) ? (
                  <CheckCircle className="text-[#28c244]" size={16} />
                ) : <XCircle className="text-[#f86151]" size={16} />}
                {problemsStatus.has(problem.problemURL) ? 'Solved': 'Not Solved'}
              </td>
              <td className="p-1 sm:p-2 text-blue-400 cursor-pointer hover:underline text-xs sm:text-sm" 
                onClick={()=> {
                  router.push(`/problems/${problem.problemURL}`)
                }}
              >
                {problem.title}
              </td>
              <td className="p-1 sm:p-2 text-xs sm:text-sm">
                {acceptancePercentage === 'N/A' ? 'N/A' : (`${acceptancePercentage} %`)}
              </td>
              <td
                className={`p-1 sm:p-2 text-xs sm:text-sm font-semibold ${
                  problem.difficulty === "Easy"
                    ? "text-[#28c244]"
                    : problem.difficulty === "Medium"
                    ? "text-[#fac31d]"
                    : "text-[#f86151]"
                }`}
              >
                {problem.difficulty}
              </td>
              <td className="p-1 sm:p-2 text-xs sm:text-sm">{problem.frequency}</td>
            </tr>
          )
        }
          )}
        </tbody> 
      </table>
      
      {/* Pagination Controls */}
      <div className="flex justify-center mt-3">
        <button
          className="px-3 py-1 sm:px-4 sm:py-2 mx-1 bg-gray-700 text-white rounded disabled:opacity-50 text-xs sm:text-sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span className="text-white px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          className="px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm mx-1 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );  
};

export default ProblemTable;
