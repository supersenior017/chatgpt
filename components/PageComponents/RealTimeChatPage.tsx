import { Inter } from '@next/font/google';
import React, { useState, useRef, useEffect } from 'react'
import { ChatContentTypes } from './Homepage';
import ChatBox from '../Components/ChatBox';
import { Icon } from '@iconify/react';

const interB = Inter({ subsets: ['latin'], weight: '900' })
const inter = Inter({ subsets: ['latin'], weight: '400' })

export default function RealTimeChatPage() {
    const defaultPromot = process.env.DEFAULT_CHAT_PROMPT;

    const [inputValue, setInputValue] = useState<string>("");
    const [prompt, setPrompt] = useState<string>(defaultPromot as string);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [chatContent, setChatContent] = useState<ChatContentTypes[]>([]);
    const [isShowHint, setIsShowHint] = useState<string>('');

    const chatBoxRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const handleGetAnswer = async () => {
        if (inputValue === '') {
            setIsShowHint('input')
        } else if (inputValue === '/reset') {
            handleClearHistory()
        } else if (inputValue) {
            try {
                setIsLoading(true);
                setInputValue('');
                setChatContent([...chatContent, { Human: inputValue, AI: '...' }]);
                const res = await fetch(`/api/openai-chat`, {
                    body: JSON.stringify(prompt + `Human:${inputValue}\nAI:`),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST'
                });
                const data = await res.json();
                setPrompt(prompt + `Human:${inputValue}\nAI:${data}\n`)
                setChatContent([...chatContent, { Human: inputValue, AI: data }])
                localStorage.setItem('realTimeChat', JSON.stringify([...chatContent, { Human: inputValue, AI: data }]))
                localStorage.setItem('rememberPrompt', (prompt + `Human:${inputValue}\nAI:${data}\n`))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('realTimeChat')
        localStorage.removeItem('rememberPrompt')
        setChatContent([])
        setInputValue('')
        setPrompt(defaultPromot as string)
        setIsLoading(false)
        setIsShowHint('')
        if (inputRef) {
            inputRef.current?.focus()
        }
    }

    useEffect(() => {
        if (inputRef) {
            inputRef.current?.focus()
        }
    }, [JSON.stringify(chatContent)])

    useEffect(() => {
        const rememberChatContent = localStorage.getItem('realTimeChat')
        const rememberPrompt = localStorage.getItem('rememberPrompt')
        if (rememberPrompt && rememberPrompt.length > 0) {
            setPrompt(rememberPrompt)
        }
        if (rememberChatContent && rememberChatContent.length > 0) {
            setChatContent(JSON.parse(rememberChatContent))
        }
    }, [])

    return (
        <div className='descSection w-full max-w-7xl flex flex-col justify-evenly gap-6 lg:gap-0 mt-6 lg:mt-0'>
            <div className='flex items-center gap-2'>
                <Icon icon='material-symbols:chat-bubble-outline-rounded' className='text-purple-500 text-3xl' />
                <div className={`${interB.className} text-3xl text-purple-500`}>Real Time Chat</div>
            </div>
            <div className='flex flex-col lg:flex-row justify-around gap-4'>
                <ChatBox
                    clearFunc={handleClearHistory}
                    getAnswerFunc={handleGetAnswer}
                    setInputValue={setInputValue}
                    chatContent={chatContent}
                    isLoading={isLoading}
                    inputValue={inputValue}
                    chatBoxRef={chatBoxRef}
                    inputRef={inputRef}
                    isShowHint={isShowHint}
                    setIsShowHint={setIsShowHint}
                    title='Real time chat'
                    isRememberChat
                />
                <div className='max-w-auto lg:max-w-md text-sm'>
                    <div className={`text-xl ${interB.className}`}>Prompt</div>
                    <div className={`${inter.className} flex flex-col rounded-xl p-3 px-5 mt-1 bg-[#3a0e1f73]`}>
                        <div>The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.</div><br />
                        <div><span className='font-bold'>Human:</span> Hello, My name is Adan Cui.</div>
                        <div><span className='font-bold'>AI:</span> Hello, Nice to meet you, Adan! What can I do for you?</div>
                        <div><span className='font-bold'>Human:</span> Do you remember my name?</div>
                        <div><span className='font-bold'>AI:</span></div>
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Response</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#0e3a0f73]`}>
                        Yes, of course I remember! Your name is Adan Cui. Is there anything else I can do for you?
                    </div>
                    <div className={`text-xl mt-5 ${interB.className}`}>Keyword</div>
                    <div className={`${inter.className} rounded-xl p-3 px-5 mt-1 bg-[#3a2c0e73]`}>
                        <span className='font-bold'>/reset</span>: Reset all chats between AI bots.
                    </div>
                </div>
            </div>
        </div>
    )
}
