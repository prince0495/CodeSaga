"use client"
import React from 'react'
import Split from 'react-split'
import Problem from './Problem'
import { ProblemInfo } from '@/app/problems/[...slug]/page'
import WorkSpace from './WorkSpace'
import Submissions from './Submissions'
import TestCases from './TestCases'

const SplitPage = ({problemInfo, pageType, problemURL}: {problemInfo: ProblemInfo | null, pageType: string, problemURL: string}) => {
  if(!problemInfo) {
    return (<>Loading...</>);
  }
  return (
    <div className='overflow-x-hidden'>
      <Split
          className="split h-[calc(100vh-4rem)] overflow-y-auto"
          minSize={0}
      >
            {pageType === 'description' ? (<Problem problemInfo={problemInfo} problemURL={problemURL} />) : (pageType==='submissions' ? <Submissions problemURL={problemURL} /> : <TestCases problemURL={problemURL} examples={problemInfo.examples} />)}
            <WorkSpace problemURL={problemURL} />
      </Split>
    </div>
  )
}

export default SplitPage