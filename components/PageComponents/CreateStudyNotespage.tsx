import { Inter } from '@next/font/google'
import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import ChatBox from '../Components/ChatBox'
import { ChatContentTypes } from './Homepage'

const interB = Inter({ subsets: ['latin'], weight: '900' })
const inter = Inter({ subsets: ['latin'], weight: '400' })

export default function CreateStudyNotespage() {
    const defaultPromot = '';

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<ChatContentTypes[]>([]);
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
    const [isShowHint, setIsShowHint] = useState<string>('');

    const chatBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetAnswer = async () => {
        if (inputValue === '') {
            setIsShowHint('input')
        } else if (inputValue === '/reset') {
            handleClearHistory()
        } else if (inputValue === '/history') {
            setIsShowHistory(true)
            setInputValue('')
        } else if (inputValue === '/home') {
            setIsShowHistory(false)
            setInputValue('')
        } else if (inputValue) {
            try {
                setIsLoading(true);
                setInputValue('');
                setIsShowHistory(false);
                const res = await fetch(`/api/openai-create-study-notes`, {
                    body: JSON.stringify(defaultPromot + inputValue),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                const data = await res.json();
                const mainData = data.trimStart();
                setChatHistory([...chatHistory, { Human: inputValue, AI: mainData }])
                localStorage.setItem('createstudynote', JSON.stringify([...chatHistory, { Human: inputValue, AI: mainData }]))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('createstudynote')
        setChatHistory([])
        setInputValue('')
        setIsLoading(false)
        setIsShowHistory(false)
        setIsShowHint('')
        if (inputRef) {
            inputRef.current?.focus()
        }
    }

    useEffect(() => {
        const rememberHistory = localStorage.getItem('createstudynote')
        if (rememberHistory && rememberHistory.length > 0) {
            setChatHistory(JSON.parse(rememberHistory))
        }
    }, [])

    return (
        <div className='descSection w-full max-w-7xl flex flex-col justify-evenly gap-6 lg:gap-0 mt-6 lg:mt-0'>
            <div className='flex items-center gap-2'>
                <Icon icon='uil:comment-notes' className='text-purple-500 text-3xl' />
                <div className={`${interB.className} text-[27px] sm:text-3xl text-purple-500`}>Create Study Notes</div>
            </div>
            <div className='flex flex-col lg:flex-row justify-around gap-4'>
                <ChatBox
                    clearFunc={handleClearHistory}
                    getAnswerFunc={handleGetAnswer}
                    setInputValue={setInputValue}
                    chatContent={chatHistory}
                    isLoading={isLoading}
                    inputValue={inputValue}
                    chatBoxRef={chatBoxRef}
                    inputRef={inputRef}
                    isRememberChat={false}
                    isShowHistory={isShowHistory}
                    setIsShowHistory={setIsShowHistory}
                    isShowHint={isShowHint}
                    setIsShowHint={setIsShowHint}
                    title='Create Study Notes'
                />
                <div className='max-w-auto lg:max-w-md text-sm'>
                    <div className={`text-xl ${interB.className}`}>Prompt</div>
                    <div className={`${inter.className} flex flex-col rounded-xl p-3 px-5 mt-1 bg-[#3a0e1f73]`}>
                        <div>What are 5 key points I should know when studying Ancient Rome?</div>
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Response</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#0e3a0f73]`}>
                        <div>1. Understand the Roman Republic and its political and social structures.</div>
                        <div>2. Learn about the major events and people of the Roman Empire, including the Pax Romana.</div>
                        <div>3. Familiarize yourself with Roman culture and society, including language, art, architecture, literature, law, and religion.</div>
                        <div>4. Study the Roman military, its tactics and organization, and its effects on the empire.</div>
                        <div>5. Examine the decline of the Roman Empire, its eventual fall, and its legacy.</div>
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Keyword</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#3a2c0e73]`}>
                        <div><span className='font-bold'>/reset</span>: Reset all chats between AI bots.</div>
                        <div><span className='font-bold'>/history</span>: Show all chats between AI bots.</div>
                        <div><span className='font-bold'>/home</span>: Show main chatbox.</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
