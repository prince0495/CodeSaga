'use client'
import React, { useState } from 'react'

const Topics = ({topics}: {topics: string[]}) => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div>

    <div className='pl-4 pr-4 flex items-center justify-between hover:cursor-pointer  '
      onClick={()=>{
        setIsOpen(!isOpen)
      }}
      >
      <div className='flex gap-4 items-center text-lg'>
        <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
    <path d="M3.49977 18.9853V20.5H5.01449C6.24074 20.5 6.85387 20.5 7.40518 20.2716C7.9565 20.0433 8.39004 19.6097 9.25713 18.7426L19.1211 8.87868C20.0037 7.99612 20.4449 7.55483 20.4937 7.01325C20.5018 6.92372 20.5018 6.83364 20.4937 6.74411C20.4449 6.20253 20.0037 5.76124 19.1211 4.87868C18.2385 3.99612 17.7972 3.55483 17.2557 3.50605C17.1661 3.49798 17.0761 3.49798 16.9865 3.50605C16.4449 3.55483 16.0037 3.99612 15.1211 4.87868L5.25713 14.7426C4.39004 15.6097 3.9565 16.0433 3.72813 16.5946C3.49977 17.1459 3.49977 17.759 3.49977 18.9853Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M13.5 6.5L17.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
        </div>
        <div>Topics</div>
      </div>
        <div>
        <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
              className={`transition-transform ${isOpen ? '' : 'rotate-180'}`}
              fill="none"
              >
              <path
                d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                />
            </svg>
        </div>
    </div>
    {isOpen && <div className='ml-4 mr-4 flex gap-4 flex-wrap mt-3'>
      {topics.map((topic, index)=>(
        <div key={index} className='bg-[#3c3c3c] pt-2 pb-2 rounded-full pl-4 pr-4'>{topic}</div>
      ))}
    </div>}
  </div>
  )
}

export default Topics
