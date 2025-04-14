"use client";

import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const ProgressCircle = () => {
  const [totalProblemsCount, setTotalProblemsCount] = useState<number>(-1);
  const [easyProblemsCount, setEasyProblemsCount] = useState<number>(-1);
  const [mediumProblemsCount, setMediumProblemsCount] = useState<number>(-1);
  const [hardProblemsCount, setHardProblemsCount] = useState<number>(-1);
  
  const [userEasyProblemsCount, setUserEasyProblemsCount] = useState<number>(-1);
  const [userMediumProblemsCount, setUserMediumProblemsCount] = useState<number>(-1);
  const [userHardProblemsCount, setUserHardProblemsCount] = useState<number>(-1);
  const [userAcceptedSubmissions, setUserAcceptedSubmissions] = useState<number>(-1);
  const [totalAcceptanceRate, setTotalAcceptanceRate] = useState<number>(-1);
  
  
  const session = useSession();
  const circumference = 100; // Defines the total circumference
  const strokeWidth = 2; // Thickness of the circular progress

  async function getProgress() {
    if (totalProblemsCount === -1) {
      try {
        const res = await axios.get("/api/getProgressCount");
        const obj = await res.data;
        const { totalCount, easyCount, mediumCount, hardCount } = obj;
        setTotalProblemsCount(totalCount);
        setEasyProblemsCount(easyCount);
        setMediumProblemsCount(mediumCount);
        setHardProblemsCount(hardCount);
        // @ts-ignore
        if(session.data && session.data.user && session.data.user.id) {
          // @ts-ignore
          const response = await axios.get('/api/getUserProgress/'+session.data.user.id);
          // add extra check here later
          if(response.data) {
            console.log(response.data);
            
            const obj: {
              acceptedEasy: number,
              acceptedMedium: number,
              acceptedHard: number,
              acceptedSubmissions: number,
              duplicateAcceptedSubmissions: number,
              totalSubmissions: number,
              duplicateTotalSubmissions: number
          } = response.data
            setUserEasyProblemsCount(obj.acceptedEasy)
            setUserMediumProblemsCount(obj.acceptedMedium)
            setUserHardProblemsCount(obj.acceptedHard)
            setUserAcceptedSubmissions(obj.acceptedSubmissions)
            let allAcceptedSubmissions = obj.acceptedSubmissions+obj.duplicateAcceptedSubmissions;
            let allTotalSubmissions = obj.totalSubmissions+obj.duplicateTotalSubmissions;
            setTotalAcceptanceRate(allTotalSubmissions === 0 ? 0 : allAcceptedSubmissions*100/allTotalSubmissions)
          }
          
        }
      } catch (error) {
        console.error("Failed to fetch progress data", error);
      }
    }
  }

  useEffect(() => {
    getProgress();
  }, [session]);

  if (totalProblemsCount === -1) {
    return (
      <div className="flex items-center justify-center space-x-6 p-3 bg-[#1c1c1c] rounded-xl shadow-lg text-white w-full max-w-lg">
        <div className="w-36 h-36 bg-gray-700 rounded-full animate-pulse"></div>
        <div className="flex flex-col space-y-2 w-40">
          <div className="w-full h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-3/4 h-4 bg-gray-700 rounded animate-pulse"></div>
          <div className="w-1/2 h-4 bg-gray-700 rounded animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center space-x-6 p-3 bg-[#1c1c1c] rounded-xl shadow-lg text-white w-full max-w-lg overflow-x-auto">
      {/* Circular Progress Section */}
      <div className="relative w-36 h-36 group">
  <svg width="140" height="140" viewBox="0 0 36 36" className="rotate-[-90deg]">
    {/* Background Circle */}
    <circle cx="18" cy="18" r="16" fill="none" stroke="#333" strokeWidth={strokeWidth} />
    {/* Easy (Green) */}
    <circle
      cx="18"
      cy="18"
      r="16"
      fill="none"
      stroke="#00C853"
      strokeWidth={strokeWidth}
      strokeDasharray={`${(userEasyProblemsCount / totalProblemsCount) * circumference} ${circumference}`}
      strokeDashoffset="0"
    />
    {/* Medium (Orange) */}
    <circle
      cx="18"
      cy="18"
      r="16"
      fill="none"
      stroke="#FFA000"
      strokeWidth={strokeWidth}
      strokeDasharray={`${(userMediumProblemsCount / totalProblemsCount) * circumference} ${circumference}`}
      strokeDashoffset={`-${(userEasyProblemsCount / totalProblemsCount) * circumference}`}
    />
    {/* Hard (Red) */}
    <circle
      cx="18"
      cy="18"
      r="16"
      fill="none"
      stroke="#D50000"
      strokeWidth={strokeWidth}
      strokeDasharray={`${(userHardProblemsCount / totalProblemsCount) * circumference} ${circumference}`}
      strokeDashoffset={`-${((userEasyProblemsCount / totalProblemsCount) * circumference) + ((userMediumProblemsCount / totalProblemsCount) * circumference)}`}
    />
  </svg>

  {/* Default Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center font-bold transition-opacity duration-300 group-hover:opacity-0">
    <span className="text-base leading-tight">All</span>
    <span className="text-xl leading-tight">
      {userAcceptedSubmissions === -1 ? 0 : userAcceptedSubmissions}
    </span>
    <hr className="w-8 border-white my-0.5" />
    <span className="text-xl leading-tight">{totalProblemsCount}</span>
  </div>

  {/* Hover Content */}
  <div className="absolute inset-0 items-center justify-center font-bold text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-0">
    {/* {totalAcceptanceRate} % */}
    <div className="text-sm text-slate-400">acceptance</div>
    <div className="text-lg">{totalAcceptanceRate === -1 ? 0 : totalAcceptanceRate.toFixed(2)} %</div>
  </div>
</div>


      {/* Statistics Section */}
      <div className="text-left text-sm flex flex-col gap-2">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          <span>Easy</span>
          <span className="ml-auto">{userEasyProblemsCount !== -1 ? userEasyProblemsCount : 0}/{easyProblemsCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
          <span>Medium</span>
          <span className="ml-auto">{userMediumProblemsCount !== -1 ? userMediumProblemsCount : 0}/{mediumProblemsCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span>Hard</span>
          <span className="ml-auto">{userHardProblemsCount !== -1 ? userHardProblemsCount : 0}/{hardProblemsCount}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
