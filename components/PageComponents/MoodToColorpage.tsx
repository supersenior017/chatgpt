import { Inter } from '@next/font/google'
import React, { useEffect, useState, useRef } from 'react'
import { Icon } from '@iconify/react'
import ChatBox from '../Components/ChatBox'
import { ChatContentTypes } from './Homepage'

const interB = Inter({ subsets: ['latin'], weight: '900' })
const inter = Inter({ subsets: ['latin'], weight: '400' })

export interface MoodChatContentTypes extends ChatContentTypes {
    Color?: string;
}

export default function MoodToColorpage() {
    const defaultPromot = process.env.DEFAULT_MOOD_TO_COLOR;

    const [inputValue, setInputValue] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatHistory, setChatHistory] = useState<MoodChatContentTypes[]>([]);
    const [isShowHistory, setIsShowHistory] = useState<boolean>(false);
    const [isShowHint, setIsShowHint] = useState<string>('');
    const [moodColor, setMoodColor] = useState<string>('');

    const chatBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetAnswer = async () => {
        if (inputValue === '') {
            setIsShowHint('input');
        } else if (inputValue === '/reset') {
            handleClearHistory();
        } else if (inputValue === '/history') {
            setIsShowHistory(true);
            setInputValue('');
        } else if (inputValue === '/home') {
            setIsShowHistory(false);
            setInputValue('');
        } else if (inputValue) {
            try {
                setIsLoading(true);
                setInputValue('');
                setIsShowHistory(false);
                const res = await fetch(`/api/openai-grammar-correction`, {
                    body: JSON.stringify(defaultPromot + inputValue + ':'),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                const data = await res.json();
                const mainData = data.trimStart();
                const color = mainData.startsWith('#') ? mainData.slice(0, 7) : mainData.slice(18, mainData.length - 1);
                console.log(color)
                setMoodColor(color)
                setChatHistory([...chatHistory, { Human: inputValue, AI: mainData, Color: color }])
                localStorage.setItem('moodtocolor', JSON.stringify([...chatHistory, { Human: inputValue, AI: mainData, Color: color }]))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('moodtocolor')
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
        const rememberHistory = localStorage.getItem('moodtocolor')
        if (rememberHistory && rememberHistory.length > 0) {
            const JSONHistory = JSON.parse(rememberHistory)
            setChatHistory(JSONHistory)
            setMoodColor(JSONHistory[JSONHistory.length - 1].Color)
        }
    }, [])

    return (
        <div className='descSection w-full max-w-7xl flex flex-col justify-evenly gap-6 lg:gap-0 mt-6 lg:mt-0'>
            <div className='flex items-center gap-2'>
                <Icon icon='ic:round-color-lens' className='text-purple-500 text-3xl' />
                <div className={`${interB.className} text-[27px] sm:text-3xl text-purple-500`}>Mood to Color</div>
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
                    moodColor={moodColor}
                    title='Mood to Color'
                />
                <div className='max-w-auto lg:max-w-md text-sm'>
                    <div className={`text-xl ${interB.className}`}>Prompt</div>
                    <div className={`${inter.className} flex flex-col rounded-xl p-3 px-5 mt-1 bg-[#3a0e1f73]`}>
                        <div>The CSS code for a color like a blue sky at dusk:</div><br />
                        <div>background-color: #</div>
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Response</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#3A5F9F]`}>
                        3A5F9F
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
