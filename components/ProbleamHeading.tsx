import IsSolved from "./IsSolved"

const ProbleamHeading = ({title, difficulty, problemURL}: {title: string, difficulty: string, problemURL: string}) => {
  return (
    <div>
        <div className='flex flex-col gap-7'>
            <div className='flex items-center justify-between'>
                <div className='text-3xl font-semibold text-[#f5f5f5]'>{title}</div>
                <IsSolved problemURL={problemURL} />
            </div>
            <div className='flex gap-3 items-center'>
                <div className={`${difficulty === 'Easy' ? 'text-[#46c6c2]' : (difficulty === 'Medium' ? 'text-[#fac31d]': 'text-[#f86151]')} bg-[#333333] p-1 px-3 rounded-full `}>{difficulty}</div>
                <div className='bg-[#333333] p-1 px-3 rounded-full flex justify-center items-center gap-1 hover:cursor-pointer'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"} >
                            <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11 20H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                    </div>
                    <div>Topics</div>
                </div>
                <div className='bg-[#333333] p-1 px-3 rounded-full flex justify-center items-center gap-1 hover:cursor-pointer'>
                    <div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#ffffff"} fill={"none"}>
    <path d="M12 16.5V14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4.2678 18.8447C4.49268 20.515 5.87612 21.8235 7.55965 21.9009C8.97626 21.966 10.4153 22 12 22C13.5847 22 15.0237 21.966 16.4403 21.9009C18.1239 21.8235 19.5073 20.515 19.7322 18.8447C19.8789 17.7547 20 16.6376 20 15.5C20 14.3624 19.8789 13.2453 19.7322 12.1553C19.5073 10.485 18.1239 9.17649 16.4403 9.09909C15.0237 9.03397 13.5847 9 12 9C10.4153 9 8.97626 9.03397 7.55965 9.09909C5.87612 9.17649 4.49268 10.485 4.2678 12.1553C4.12104 13.2453 3.99999 14.3624 3.99999 15.5C3.99999 16.6376 4.12104 17.7547 4.2678 18.8447Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7.5 9V6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
                    </div>
                    <div>Companies</div>
                </div>
                <div></div>
                <div></div>
            </div>
        </div>
    </div>
  )
}

export default ProbleamHeading
