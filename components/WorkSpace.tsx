import { useState, useRef, useEffect } from 'react';
import WorkSpaceNavbar from './WorkSpaceNavbar';
import CodeSpace from './CodeSpace';
import {useCodeStore} from '@/lib/store';

const WorkSpace = ({ problemURL }: { problemURL: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState(useCodeStore(state=>state.userCodeLanguage) || 'cpp');
  const setUserCodeLanguage = useCodeStore(state=>state.setUserCodeLanguage)
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (lang: string) => {
    setSelectedLang(lang);
    setUserCodeLanguage(lang)
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="rounded-lg bg-[#262626] overflow-auto">
      <WorkSpaceNavbar />
      <div className="bg-[#262626] border-b border-[#4e4e4e] h-10 flex items-center justify-start p-1">
        <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-1 hover:bg-[#404040] rounded-md flex items-center gap-1 cursor-pointer text-white"
          >
            <span>{selectedLang}</span>
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
          </button>
          {isOpen && (
            <div className="absolute left-0 mt-1 w-24 bg-[#333333] border border-[#4e4e4e] rounded-md shadow-lg z-10">
              <ul className="text-white">
                <li
                  className="px-4 py-2 hover:bg-[#404040] cursor-pointer"
                  onClick={() => handleSelect('java')}
                >
                  Java
                </li>
                <li
                  className="px-4 py-2 hover:bg-[#404040] cursor-pointer"
                  onClick={() => handleSelect('cpp')}
                >
                  C++
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <CodeSpace problemURL={problemURL} />
    </div>
  );
};

export default WorkSpace;
