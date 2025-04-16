'use client'

import CodeMirror from '@uiw/react-codemirror'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { useEffect, useCallback, useRef, useState } from 'react'
import axios from 'axios'
import { useCodeStore } from '@/lib/store'

const CodeSpace = ({ problemURL }: { problemURL: string }) => {
  const snippets = useCodeStore(state => state.snippets);
  const addSnippet = useCodeStore(state => state.addSnippet);
  const updateSnippet = useCodeStore(state => state.updateSnippet);
  const selectedLanguage = useCodeStore(state => state.userCodeLanguage);
  
  const typingTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);
  const [saved, setSaved] = useState('Saved');

  useEffect(() => {
    const checkHydration = setInterval(() => {
      if (useCodeStore.persist.hasHydrated()) {
        setIsHydrated(true);
        clearInterval(checkHydration);
      }
    }, 100);
    return () => clearInterval(checkHydration);
  }, []);

  const fetchBoilerPlate = useCallback(async () => {
    if (!isHydrated || snippets[problemURL]) return;

    try {
      const res = await axios.get(`/api/boiler/${problemURL}`);
      addSnippet(problemURL, 'java', { language: 'java', code: res.data.boilerPlates[0] });
      addSnippet(problemURL, 'cpp', { language: 'cpp', code: res.data.boilerPlates[1] });
    } catch (error) {
      console.error('Error fetching boilerplate:', error);
    }
  }, [problemURL, addSnippet, isHydrated, snippets]); 

  useEffect(() => {
    fetchBoilerPlate();
  }, [fetchBoilerPlate]);

  const handleCodeChange = useCallback((newCode: string) => {
    setSaved('Saving...');

    if (typingTimeout.current) {
      clearTimeout(typingTimeout.current);
    }

    typingTimeout.current = setTimeout(() => {
      updateSnippet(problemURL, selectedLanguage, { language: selectedLanguage, code: newCode });
      setSaved('Saved');
    }, 1200);
  }, [problemURL, selectedLanguage, updateSnippet]);

  return (
    <div>
      {isHydrated ? (
        <div>
          <CodeMirror
            theme={vscodeDark}
            value={snippets[problemURL]?.[selectedLanguage]?.code || ''}
            extensions={[java(), cpp(), javascript()]}
            onChange={handleCodeChange}
            height="73vh"
            style={{ fontSize: 16 }}
          />
          <div className='flex items-center justify-start mx-4 text-[#aaaaaa]'>
            {saved}
          </div>
        </div>
      ) : 'Loading...'}
    </div>
  );
};

export default CodeSpace;
