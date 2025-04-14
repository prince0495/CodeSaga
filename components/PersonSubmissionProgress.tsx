'use client';

import { UserType } from '@/lib/types';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export default function PersonSubmissionProgress({person} : {person: UserType | null}) {
  const [hovered, setHovered] = useState<'overall' | 'easy' | 'medium' | 'hard' | null>(null);
  const [totalEasyCount, setTotalEasyCount] = useState<number>(-1)
  const [totalMediumCount, setTotalMediumCount] = useState<number>(-1)
  const [totalHardCount, setTotalHardCount] = useState<number>(-1)

  useEffect(() => {
    async function fetchData() {
        const res = await axios.get('/api/getProgressCount')
        if(res.data && res.data?.totalCount) {
            setTotalEasyCount(res.data.easyCount)
            setTotalMediumCount(res.data.mediumCount)
            setTotalHardCount(res.data.hardCount)
        }
    }
    fetchData();
  }, [person]);

  if (!person) {
    return (
      <div className="bg-[#282828] p-4 rounded-lg text-white flex flex-col items-center w-full lg:w-1/2">
        <div className="w-32 h-32 bg-[#303030] rounded-full animate-pulse" />
        <div className="flex flex-col w-full mt-4 space-y-2">
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
        </div>
      </div>
    )
  }

  const overallAcceptance = ((person.totalSubmissions+person.duplicateTotalSubmissions) !== 0 ? (person.acceptedSubmissions+person.duplicateAcceptedSubmissions) / (person.totalSubmissions+person.duplicateTotalSubmissions) : 0) * 100;
  const easyAcceptance = ((person.totalEasy+person.duplicateTotalEasy) !== 0 ? (person.acceptedEasy+person.duplicateAcceptedEasy) / (person.totalEasy+person.duplicateTotalEasy) : 0) * 100;
  const mediumAcceptance = ((person.totalMedium+person.duplicateTotalMedium) !== 0 ? (person.acceptedMedium+person.duplicateAcceptedMedium) / (person.totalMedium+person.duplicateTotalMedium) : 0) * 100;
  const hardAcceptance = ((person.totalHard+person.duplicateTotalHard) !== 0 ? (person.acceptedHard+person.duplicateAcceptedHard) / (person.totalHard+person.duplicateTotalHard) : 0) * 100;
  
  const displayedAcceptance =
    hovered === 'easy'
      ? easyAcceptance
      : hovered === 'medium'
      ? mediumAcceptance
      : hovered === 'hard'
      ? hardAcceptance
      : overallAcceptance;

  return (
    <div> {
      (person && totalEasyCount !== -1) ? <div className="bg-[#282828] p-4 rounded-lg text-white flex flex-col items-center w-full">
        <div className="relative w-32 h-32">
          <CircularProgressbarWithChildren
            value={displayedAcceptance}
            styles={buildStyles({
              pathColor: hovered === 'easy' ? '#23d5ab' : hovered === 'medium' ? '#ffbf00' : hovered === 'hard' ? '#ff4d4d' : '#82ca9d',
              trailColor: '#444',
              textColor: '#ffffff',
            })}
          >
            <div className="text-2xl font-bold">{displayedAcceptance.toFixed(1)}%</div>
            <div className="text-sm text-gray-400">Acceptance Rate</div>
          </CircularProgressbarWithChildren>
        </div>
        <div className="flex flex-col w-full mt-4">
          <div
            className="bg-[#2a2a2a] p-2 rounded-md flex justify-between cursor-pointer hover:bg-[#23d5ab]/20"
            onMouseEnter={() => setHovered('easy')}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="text-[#23d5ab] font-semibold">Easy</span>
            <span>{person.acceptedEasy}/{totalEasyCount}</span>
          </div>
          <div
            className="bg-[#2a2a2a] p-2 rounded-md flex justify-between cursor-pointer hover:bg-[#ffbf00]/20"
            onMouseEnter={() => setHovered('medium')}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="text-[#ffbf00] font-semibold">Medium</span>
            <span>{person.acceptedMedium}/{totalMediumCount}</span>
          </div>
          <div
            className="bg-[#2a2a2a] p-2 rounded-md flex justify-between cursor-pointer hover:bg-[#ff4d4d]/20"
            onMouseEnter={() => setHovered('hard')}
            onMouseLeave={() => setHovered(null)}
          >
            <span className="text-[#ff4d4d] font-semibold">Hard</span>
            <span>{person.acceptedHard}/{totalHardCount}</span>
          </div>
        </div>
      </div>
      : (<div className="bg-[#282828] p-4 rounded-lg text-white flex flex-col items-center w-full">
        <div className="w-32 h-32 bg-[#303030] rounded-full animate-pulse" />
        <div className="flex flex-col w-full mt-4 space-y-2">
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
          <div className="bg-[#303030] p-2 rounded-md animate-pulse w-full h-8" />
        </div>
      </div>)
    }
    </div>
  );
}
