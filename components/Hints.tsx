'use client'

import { useState } from "react"

const Hints = ({hints}: {hints: string[]}) => {
  const [isOpen, setIsOpen] = useState<number>(-1)

  return (
    <div>

      {hints.map((hint, index)=> (
        <div key={index}>
        <div className="flex items-center justify-center">
          <div className="bg-[#333333] h-0.5 w-full mt-2 mb-2 ml-4 mr-4"></div>
        </div>
          <div>
              <div className='pl-4 pr-4 flex items-center justify-between hover:cursor-pointer  '
              onClick={()=>{
                console.log('set index=', index);
                if(isOpen === index) {
                  setIsOpen(-1)
                }
                else {
                  setIsOpen(index)
                }
              }}
              >
              <div className='flex gap-4 items-center text-lg'>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
            <path d="M5.14286 14C4.41735 12.8082 4 11.4118 4 9.91886C4 5.54539 7.58172 2 12 2C16.4183 2 20 5.54539 20 9.91886C20 11.4118 19.5827 12.8082 18.8571 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M14 10C13.3875 10.6432 12.7111 11 12 11C11.2889 11 10.6125 10.6432 10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M7.38287 17.0982C7.291 16.8216 7.24507 16.6833 7.25042 16.5713C7.26174 16.3343 7.41114 16.1262 7.63157 16.0405C7.73579 16 7.88105 16 8.17157 16H15.8284C16.119 16 16.2642 16 16.3684 16.0405C16.5889 16.1262 16.7383 16.3343 16.7496 16.5713C16.7549 16.6833 16.709 16.8216 16.6171 17.0982C16.4473 17.6094 16.3624 17.8651 16.2315 18.072C15.9572 18.5056 15.5272 18.8167 15.0306 18.9408C14.7935 19 14.525 19 13.9881 19H10.0119C9.47495 19 9.2065 19 8.96944 18.9408C8.47283 18.8167 8.04281 18.5056 7.7685 18.072C7.63755 17.8651 7.55266 17.6094 7.38287 17.0982Z" stroke="currentColor" strokeWidth="1.5" />
            <path d="M15 19L14.8707 19.6466C14.7293 20.3537 14.6586 20.7072 14.5001 20.9866C14.2552 21.4185 13.8582 21.7439 13.3866 21.8994C13.0816 22 12.7211 22 12 22C11.2789 22 10.9184 22 10.6134 21.8994C10.1418 21.7439 9.74484 21.4185 9.49987 20.9866C9.34144 20.7072 9.27073 20.3537 9.12932 19.6466L9 19" stroke="currentColor" strokeWidth="1.5" />
            <path d="M12 15.5V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>Hint {index+1}</div>
              </div>
                <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      className={`transition-transform ${isOpen !== index ? 'rotate-180' : ''}`}
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
              {isOpen === index && <div className="pl-4 pr-4 pt-2 pb-2">
                {hint}
              </div>}
          </div>
          </div>
      ))}
    </div>
  )
}

export default Hints
