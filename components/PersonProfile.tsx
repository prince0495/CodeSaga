'use client'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import { UserType } from '@/lib/types'
import PersonSubmissionsGraph from './PersonSubmissionsGraph'
import PersonSubmissionProgress from './PersonSubmissionProgress'
import PersonYearlySubmissions from './PersonYearlySubmissions'

export type ProfileData = {
    location: string;
    education: string;
    bio: string;
    socialLinks: string[];
    name: string;
  };

const PersonProfile = ({personId}: {personId: string}) => {
    const [person, setPerson] = useState<UserType | null>(null)

    useEffect(() => {
      async function getUserDetails() {
        if(!person) {
            const res = await axios.get('/api/user/getUser/'+personId);
            if(res.data) {
                if(res.data?.id) {
                    setPerson(res.data)
                }
                else {
                    console.log(res.data);
                }
            }
        }
    }
        getUserDetails()
    }, [personId, person])
    
  return (
  <div className="flex min-h-[calc(100vh-4rem)] select-none">
        <div className="lg:w-3/12 w-0 rounded-lg my-6 c-450:ml-8 bg-[#282828] flex flex-col gap-3 overflow-hidden">
            {person ? <div className="flex flex-col p-4">
                <div className='flex gap-6 justify-start'>
                <div className='clg:w-[100px] clg:h-[100px] clg:min-w-[100px] min-w-[70px]'> 
                    <Image
                    className='rounded-lg'
                      src={person.image}
                      alt='User Pic'
                      width={100}
                      height={100}
                    />

                </div>
                <div className='flex flex-col justify-between'>
                    <div> 
                    <div className='text-xl font-semibold'>{person?.name}</div>
                    <div className='text-sm text-[#9fa1a4] '>{person.email}</div>
                    </div>
                    <div className='flex gap-3'>
                    <div className='text-[#9fa1a4] font-semibold'>Joined</div>
                    <div>{new Date(person.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</div>
                    </div>
                </div>
                </div>
            </div> : (<div className="flex flex-col p-4">
      <div className="flex gap-6 justify-start">
        <div>
          <div className="w-[100px] h-[100px] bg-[#303030] rounded-lg animate-pulse" />
        </div>
        <div className="flex flex-col justify-between w-full max-w-xs">
          <div>
            <div className="w-40 h-6 bg-[#303030] rounded-md animate-pulse mb-2" />
            <div className="w-32 h-4 bg-[#303030] rounded-md animate-pulse" />
          </div>
          <div className="flex gap-3 mt-2">
            <div className="w-16 h-4 bg-[#303030] rounded-md animate-pulse" />
            <div className="w-24 h-4 bg-[#303030] rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>)}
        {person?.bio && (
            <div className="mx-4 text-[#bdbfc2] whitespace-pre-line">
            {person.bio}
            </div>
        )}
                
            {person ? <div className='flex flex-col px-4 gap-4'>
                {person?.location && <div className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="#bdbfc2"><path fillRule="evenodd" d="M20.364 10.364c0 2.814-1.496 5.556-3.956 8.153a25.656 25.656 0 01-3.506 3.072c-.161.116-.28.198-.347.243a1 1 0 01-1.11 0 12.541 12.541 0 01-.347-.243 25.651 25.651 0 01-3.506-3.071c-2.46-2.598-3.956-5.34-3.956-8.154a8.364 8.364 0 0116.728 0zm-7.836 8.997a23.687 23.687 0 002.428-2.22c2.142-2.26 3.408-4.58 3.408-6.777a6.364 6.364 0 00-12.728 0c0 2.196 1.266 4.517 3.408 6.778A23.689 23.689 0 0012 19.769c.166-.124.342-.26.528-.408zM12 12.91a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                        
                    </div>
                    <div>{person.location}</div>
                </div>}
                {person?.education && <div className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path d="M13.465 3.862a3 3 0 00-2.957-.048L2.61 8.122a1 1 0 000 1.756L5 11.18v6.27c0 .59.26 1.15.74 1.491 1.216.86 3.75 2.409 6.26 2.409s5.044-1.548 6.26-2.409c.48-.34.74-.901.74-1.491v-6.27l1.4-.98v4.7a.9.9 0 101.8 0V9.572a1 1 0 00-.493-.862l-8.242-4.848zM18.82 9l-5.862 3.198a2 2 0 01-1.916 0L5.18 9l5.862-3.198a2 2 0 011.916 0L18.82 9zM17 16.687a.937.937 0 01-.413.788c-.855.565-2.882 1.774-4.587 1.774-1.705 0-3.732-1.209-4.587-1.774A.936.936 0 017 16.687V12.27l3.562 1.945a3 3 0 002.876 0L17 12.27v4.417z"></path></svg>
                        
                    </div>
                    <div>{person.education}</div>
                </div>}
                {person.socialHandles && person.socialHandles.map((link: string, index: number)=> (
                  <div key={index} className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                  <div>
                    {/* Github */}
                  {link.includes('github.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path fillRule="evenodd" d="M12.048 2a9.913 9.913 0 00-6.511 2.44 10.308 10.308 0 00-3.407 6.171 10.436 10.436 0 001.323 6.954 10.079 10.079 0 005.422 4.418c.505.095.684-.226.684-.497v-1.744c-2.804.624-3.396-1.378-3.396-1.378a2.738 2.738 0 00-1.115-1.504c-.906-.63.074-.63.074-.63.317.046.62.165.886.348.266.184.488.426.648.71.137.252.32.475.541.655a2.128 2.128 0 001.582.463c.28-.033.551-.122.798-.262a2.198 2.198 0 01.616-1.372c-2.23-.258-4.572-1.14-4.572-5.035a4.013 4.013 0 011.03-2.75 3.813 3.813 0 01.098-2.713s.844-.277 2.76 1.05a9.303 9.303 0 015.028 0c1.917-1.327 2.755-1.05 2.755-1.05.37.85.413 1.811.123 2.693a4.014 4.014 0 011.029 2.75c0 3.94-2.348 4.803-4.584 5.036.24.246.425.542.543.868.118.326.166.674.14 1.02v2.814c0 .333.18.591.69.49a10.085 10.085 0 005.346-4.434 10.437 10.437 0 001.29-6.91 10.31 10.31 0 00-3.373-6.132A9.916 9.916 0 0012.048 2z" clipRule="evenodd"></path></svg>) : link.includes('linkedin') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M7 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.00801 7L6.99902 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>) : link.includes('instagram.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : link.includes('facebook') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : link.includes('youtube') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>) : link.includes('x.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.50012 12C2.50012 7.52166 2.50012 5.28249 3.89136 3.89124C5.28261 2.5 7.52178 2.5 12.0001 2.5C16.4785 2.5 18.7176 2.5 20.1089 3.89124C21.5001 5.28249 21.5001 7.52166 21.5001 12C21.5001 16.4783 21.5001 18.7175 20.1089 20.1088C18.7176 21.5 16.4785 21.5 12.0001 21.5C7.52178 21.5 5.28261 21.5 3.89136 20.1088C2.50012 18.7175 2.50012 16.4783 2.50012 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.00012 17L11.1937 12.8065M17.0001 7L12.8066 11.1935M12.8066 11.1935L9.7779 7H7.00012L11.1937 12.8065M12.8066 11.1935L17.0001 17H14.2223L11.1937 12.8065" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>): link.includes('discord') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M15.5008 17.75L16.7942 19.5205C16.9156 19.7127 17.1489 19.7985 17.3619 19.7224C18.1657 19.4353 20.158 18.6572 21.7984 17.4725C21.9263 17.3801 22.0002 17.2261 21.9992 17.0673C21.9992 8.25 19.5008 5.75 19.5008 5.75C19.5008 5.75 17.5008 4.60213 15.3547 4.25602C15.1436 4.22196 14.9368 4.33509 14.8429 4.52891L14.3979 5.44677C14.3979 5.44677 13.2853 5.21397 12 5.21397C10.7147 5.21397 9.6021 5.44677 9.6021 5.44677L9.15711 4.52891C9.06314 4.33509 8.85644 4.22196 8.64529 4.25602C6.50079 4.60187 4.50079 5.75 4.50079 5.75C4.50079 5.75 2.0008 8.25 2.0008 17.0673C1.9998 17.2261 2.07365 17.3801 2.20159 17.4725C3.84196 18.6572 5.8343 19.4353 6.63806 19.7224C6.85105 19.7985 7.08437 19.7127 7.20582 19.5205L8.50079 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5008 16.75C17.5008 16.75 15.2057 18.25 12.0008 18.25C8.79587 18.25 6.50079 16.75 6.50079 16.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2508 12.25C17.2508 13.3546 16.4673 14.25 15.5008 14.25C14.5343 14.25 13.7508 13.3546 13.7508 12.25C13.7508 11.1454 14.5343 10.25 15.5008 10.25C16.4673 10.25 17.2508 11.1454 17.2508 12.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.2508 12.25C10.2508 13.3546 9.46729 14.25 8.50079 14.25C7.5343 14.25 6.75079 13.3546 6.75079 12.25C6.75079 11.1454 7.5343 10.25 8.50079 10.25C9.46729 10.25 10.2508 11.1454 10.2508 12.25Z" stroke="currentColor" strokeWidth="1.5" />
</svg>): link.includes('telegram') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : ''}
                  </div>
                  <a className='text-blue-500' href={link.startsWith('https://') ? link : 'https://'+link} target='_blank' rel="noopener noreferrer" >{link}</a>
              </div>
                ))}
            </div> : (<div className="flex flex-col px-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex gap-3 items-center text-lg">
          <div className="w-5 h-5 bg-[#303030] rounded" />
          <div className="w-40 h-5 bg-[#303030] rounded" />
        </div>
      ))}
    </div>)}
            <div className='h-[0.0125rem] bg-[#bdbfc2] mx-4'></div>
            {person ? <div className='p-4 pt-2'>
                {person.skills && person.skills.length > 0 && <div className='flex flex-col gap-5 mt-2 w-full'>
                    <div className='text-xl font-semibold'>
                        Skills
                    </div>
                    <div className='flex flex-wrap gap-2 w-full text-[#bdbfc2]'>
                        {person.skills.map((skill: string, index: number)=> (
                          <span
                          key={index}
                          className='p-2 bg-[#3e3e3e] rounded-full'>
                              {skill}
                          </span>
                        ))}
                    </div>
                </div>}
            </div> : (<div className="p-4 pt-2">
      <div className="flex flex-col gap-5 mt-2 w-full">
        <div className="text-xl font-semibold bg-[#303030] h-6 w-20 rounded-md animate-pulse"></div>
        <div className="flex flex-wrap gap-2 w-full">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className="p-2 bg-[#303030] rounded-full w-24 h-6 animate-pulse"
              ></span>
            ))}
        </div>
      </div>
    </div>)}
        </div>
        <div className="w-full lg:w-9/12 py-6 c-450:pl-3 c-450:pr-8 flex flex-col gap-6">
              <div className="block lg:hidden rounded-lg my-6 bg-[#282828] flex-col gap-3 overflow-hidden">
            {person ? <div className="flex flex-col p-4">
                <div className='flex gap-6 justify-start'>
                <div className='clg:w-[100px] clg:h-[100px] clg:min-w-[100px] min-w-[70px]'> 
                    <Image
                    className='rounded-lg'
                      src={person.image}
                      alt='User Pic'
                      width={100}
                      height={100}
                    />

                </div>
                <div className='flex flex-col justify-between'>
                    <div> 
                    <div className='text-xl font-semibold'>{person?.name}</div>
                    <div className='text-sm text-[#9fa1a4] '>{person.email}</div>
                    </div>
                    <div className='flex gap-3'>
                    <div className='text-[#9fa1a4] font-semibold'>Joined</div>
                    <div>{new Date(person.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })}</div>
                    </div>
                </div>
                </div>
            </div> : (<div className="flex flex-col p-4">
      <div className="flex gap-6 justify-start">
        <div>
          <div className="w-[100px] h-[100px] bg-[#303030] rounded-lg animate-pulse" />
        </div>
        <div className="flex flex-col justify-between w-full max-w-xs">
          <div>
            <div className="w-40 h-6 bg-[#303030] rounded-md animate-pulse mb-2" />
            <div className="w-32 h-4 bg-[#303030] rounded-md animate-pulse" />
          </div>
          <div className="flex gap-3 mt-2">
            <div className="w-16 h-4 bg-[#303030] rounded-md animate-pulse" />
            <div className="w-24 h-4 bg-[#303030] rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>)}
        {person?.bio && (
            <div className="mx-4 text-[#bdbfc2] whitespace-pre-line">
            {person.bio}
            </div>
        )}
                
            {person ? <div className='flex flex-col px-4 gap-4'>
                {person?.location && <div className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="#bdbfc2"><path fillRule="evenodd" d="M20.364 10.364c0 2.814-1.496 5.556-3.956 8.153a25.656 25.656 0 01-3.506 3.072c-.161.116-.28.198-.347.243a1 1 0 01-1.11 0 12.541 12.541 0 01-.347-.243 25.651 25.651 0 01-3.506-3.071c-2.46-2.598-3.956-5.34-3.956-8.154a8.364 8.364 0 0116.728 0zm-7.836 8.997a23.687 23.687 0 002.428-2.22c2.142-2.26 3.408-4.58 3.408-6.777a6.364 6.364 0 00-12.728 0c0 2.196 1.266 4.517 3.408 6.778A23.689 23.689 0 0012 19.769c.166-.124.342-.26.528-.408zM12 12.91a3 3 0 110-6 3 3 0 010 6zm0-2a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"></path></svg>
                        
                    </div>
                    <div>{person.location}</div>
                </div>}
                {person?.education && <div className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                    <div>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path d="M13.465 3.862a3 3 0 00-2.957-.048L2.61 8.122a1 1 0 000 1.756L5 11.18v6.27c0 .59.26 1.15.74 1.491 1.216.86 3.75 2.409 6.26 2.409s5.044-1.548 6.26-2.409c.48-.34.74-.901.74-1.491v-6.27l1.4-.98v4.7a.9.9 0 101.8 0V9.572a1 1 0 00-.493-.862l-8.242-4.848zM18.82 9l-5.862 3.198a2 2 0 01-1.916 0L5.18 9l5.862-3.198a2 2 0 011.916 0L18.82 9zM17 16.687a.937.937 0 01-.413.788c-.855.565-2.882 1.774-4.587 1.774-1.705 0-3.732-1.209-4.587-1.774A.936.936 0 017 16.687V12.27l3.562 1.945a3 3 0 002.876 0L17 12.27v4.417z"></path></svg>
                        
                    </div>
                    <div>{person.education}</div>
                </div>}
                {person.socialHandles && person.socialHandles.map((link: string, index: number)=> (
                  <div key={index} className='flex gap-3 items-center text-[#bdbfc2] justify-start text-lg'>
                  <div>
                    {/* Github */}
                  {link.includes('github.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} fill="currentColor"><path fillRule="evenodd" d="M12.048 2a9.913 9.913 0 00-6.511 2.44 10.308 10.308 0 00-3.407 6.171 10.436 10.436 0 001.323 6.954 10.079 10.079 0 005.422 4.418c.505.095.684-.226.684-.497v-1.744c-2.804.624-3.396-1.378-3.396-1.378a2.738 2.738 0 00-1.115-1.504c-.906-.63.074-.63.074-.63.317.046.62.165.886.348.266.184.488.426.648.71.137.252.32.475.541.655a2.128 2.128 0 001.582.463c.28-.033.551-.122.798-.262a2.198 2.198 0 01.616-1.372c-2.23-.258-4.572-1.14-4.572-5.035a4.013 4.013 0 011.03-2.75 3.813 3.813 0 01.098-2.713s.844-.277 2.76 1.05a9.303 9.303 0 015.028 0c1.917-1.327 2.755-1.05 2.755-1.05.37.85.413 1.811.123 2.693a4.014 4.014 0 011.029 2.75c0 3.94-2.348 4.803-4.584 5.036.24.246.425.542.543.868.118.326.166.674.14 1.02v2.814c0 .333.18.591.69.49a10.085 10.085 0 005.346-4.434 10.437 10.437 0 001.29-6.91 10.31 10.31 0 00-3.373-6.132A9.916 9.916 0 0012.048 2z" clipRule="evenodd"></path></svg>) : link.includes('linkedin') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M7 10V17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M11 13V17M11 13C11 11.3431 12.3431 10 14 10C15.6569 10 17 11.3431 17 13V17M11 13V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.00801 7L6.99902 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>) : link.includes('instagram.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.5 12C16.5 14.4853 14.4853 16.5 12 16.5C9.51472 16.5 7.5 14.4853 7.5 12C7.5 9.51472 9.51472 7.5 12 7.5C14.4853 7.5 16.5 9.51472 16.5 12Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M17.5078 6.5L17.4988 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : link.includes('facebook') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M16.9265 8.02637H13.9816C12.9378 8.02637 12.0894 8.86847 12.0817 9.91229L11.9964 21.4268M10.082 14.0017H14.8847" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : link.includes('youtube') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M12 20.5C13.8097 20.5 15.5451 20.3212 17.1534 19.9934C19.1623 19.5839 20.1668 19.3791 21.0834 18.2006C22 17.0221 22 15.6693 22 12.9635V11.0365C22 8.33073 22 6.97787 21.0834 5.79937C20.1668 4.62088 19.1623 4.41613 17.1534 4.00662C15.5451 3.67877 13.8097 3.5 12 3.5C10.1903 3.5 8.45489 3.67877 6.84656 4.00662C4.83766 4.41613 3.83321 4.62088 2.9166 5.79937C2 6.97787 2 8.33073 2 11.0365V12.9635C2 15.6693 2 17.0221 2.9166 18.2006C3.83321 19.3791 4.83766 19.5839 6.84656 19.9934C8.45489 20.3212 10.1903 20.5 12 20.5Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M15.9621 12.3129C15.8137 12.9187 15.0241 13.3538 13.4449 14.2241C11.7272 15.1705 10.8684 15.6438 10.1728 15.4615C9.9372 15.3997 9.7202 15.2911 9.53799 15.1438C9 14.7089 9 13.8059 9 12C9 10.1941 9 9.29112 9.53799 8.85618C9.7202 8.70886 9.9372 8.60029 10.1728 8.53854C10.8684 8.35621 11.7272 8.82945 13.4449 9.77593C15.0241 10.6462 15.8137 11.0813 15.9621 11.6871C16.0126 11.8933 16.0126 12.1067 15.9621 12.3129Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
</svg>) : link.includes('x.com') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M2.50012 12C2.50012 7.52166 2.50012 5.28249 3.89136 3.89124C5.28261 2.5 7.52178 2.5 12.0001 2.5C16.4785 2.5 18.7176 2.5 20.1089 3.89124C21.5001 5.28249 21.5001 7.52166 21.5001 12C21.5001 16.4783 21.5001 18.7175 20.1089 20.1088C18.7176 21.5 16.4785 21.5 12.0001 21.5C7.52178 21.5 5.28261 21.5 3.89136 20.1088C2.50012 18.7175 2.50012 16.4783 2.50012 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7.00012 17L11.1937 12.8065M17.0001 7L12.8066 11.1935M12.8066 11.1935L9.7779 7H7.00012L11.1937 12.8065M12.8066 11.1935L17.0001 17H14.2223L11.1937 12.8065" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>): link.includes('discord') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M15.5008 17.75L16.7942 19.5205C16.9156 19.7127 17.1489 19.7985 17.3619 19.7224C18.1657 19.4353 20.158 18.6572 21.7984 17.4725C21.9263 17.3801 22.0002 17.2261 21.9992 17.0673C21.9992 8.25 19.5008 5.75 19.5008 5.75C19.5008 5.75 17.5008 4.60213 15.3547 4.25602C15.1436 4.22196 14.9368 4.33509 14.8429 4.52891L14.3979 5.44677C14.3979 5.44677 13.2853 5.21397 12 5.21397C10.7147 5.21397 9.6021 5.44677 9.6021 5.44677L9.15711 4.52891C9.06314 4.33509 8.85644 4.22196 8.64529 4.25602C6.50079 4.60187 4.50079 5.75 4.50079 5.75C4.50079 5.75 2.0008 8.25 2.0008 17.0673C1.9998 17.2261 2.07365 17.3801 2.20159 17.4725C3.84196 18.6572 5.8343 19.4353 6.63806 19.7224C6.85105 19.7985 7.08437 19.7127 7.20582 19.5205L8.50079 17.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.5008 16.75C17.5008 16.75 15.2057 18.25 12.0008 18.25C8.79587 18.25 6.50079 16.75 6.50079 16.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M17.2508 12.25C17.2508 13.3546 16.4673 14.25 15.5008 14.25C14.5343 14.25 13.7508 13.3546 13.7508 12.25C13.7508 11.1454 14.5343 10.25 15.5008 10.25C16.4673 10.25 17.2508 11.1454 17.2508 12.25Z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M10.2508 12.25C10.2508 13.3546 9.46729 14.25 8.50079 14.25C7.5343 14.25 6.75079 13.3546 6.75079 12.25C6.75079 11.1454 7.5343 10.25 8.50079 10.25C9.46729 10.25 10.2508 11.1454 10.2508 12.25Z" stroke="currentColor" strokeWidth="1.5" />
</svg>): link.includes('telegram') ? (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={20} height={20} color="#bdbfc2" fill="none">
    <path d="M11.9854 15.4083L15.2268 19.0936C16.4277 20.4589 17.0282 21.1416 17.6567 20.9754C18.2852 20.8092 18.5008 19.9108 18.9318 18.1138L21.3229 8.1459C21.9868 5.37832 22.3187 3.99454 21.5808 3.312C20.843 2.62947 19.564 3.13725 17.0061 4.15282L5.13876 8.86449C3.09293 9.67674 2.07001 10.0829 2.00507 10.7808C1.99842 10.8522 1.99831 10.9241 2.00474 10.9955C2.06754 11.6937 3.08921 12.1033 5.13255 12.9223C6.05838 13.2934 6.5213 13.479 6.8532 13.8344C6.89052 13.8743 6.9264 13.9157 6.96078 13.9584C7.26658 14.3384 7.39709 14.8371 7.65808 15.8344L8.14653 17.701C8.4005 18.6715 8.52749 19.1568 8.86008 19.223C9.19267 19.2891 9.48225 18.8867 10.0614 18.0819L11.9854 15.4083ZM11.9854 15.4083L11.6676 15.0771C11.3059 14.7001 11.1251 14.5117 11.1251 14.2775C11.1251 14.0433 11.3059 13.8548 11.6676 13.4778L15.2406 9.75409" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>) : ''}
                  </div>
                  <a className='text-blue-500' href={link.startsWith('https://') ? link : 'https://'+link} target='_blank' rel="noopener noreferrer" >{link}</a>
              </div>
                ))}
            </div> : (<div className="flex flex-col px-4 gap-4">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex gap-3 items-center text-lg">
          <div className="w-5 h-5 bg-[#303030] rounded" />
          <div className="w-40 h-5 bg-[#303030] rounded" />
        </div>
      ))}
    </div>)}
            <div className='h-[0.0125rem] bg-[#bdbfc2] mx-4'></div>
            {person ? <div className='p-4 pt-2'>
                {person.skills && person.skills.length > 0 && <div className='flex flex-col gap-5 mt-2 w-full'>
                    <div className='text-xl font-semibold'>
                        Skills
                    </div>
                    <div className='flex flex-wrap gap-2 w-full text-[#bdbfc2]'>
                        {person.skills.map((skill: string, index: number)=> (
                          <span
                          key={index}
                          className='p-2 bg-[#3e3e3e] rounded-full'>
                              {skill}
                          </span>
                        ))}
                    </div>
                </div>}
            </div> : (<div className="p-4 pt-2">
      <div className="flex flex-col gap-5 mt-2 w-full">
        <div className="text-xl font-semibold bg-[#303030] h-6 w-20 rounded-md animate-pulse"></div>
        <div className="flex flex-wrap gap-2 w-full">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <span
                key={index}
                className="p-2 bg-[#303030] rounded-full w-24 h-6 animate-pulse"
              ></span>
            ))}
        </div>
      </div>
    </div>)}
            </div>
            <div className="rounded-lg w-full flex lg:flex flex-col lg:flex-row gap-6 lg:gap-2">  
                <PersonSubmissionsGraph person={person} />
                <div className='w-full lg:w-1/2 bg-[#282828] rounded-lg'>
                <PersonSubmissionProgress person={person}/>
                </div>
            </div>
            <div className='w-full bg-[#282828] rounded-lg p-4 flex flex-col items-center'>
                <PersonYearlySubmissions person={person} />
            </div>
        </div>
    </div>
  )
}

export default PersonProfile