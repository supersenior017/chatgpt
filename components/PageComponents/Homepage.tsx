import { Inter } from '@next/font/google'
import React, { useEffect, useState, useRef } from 'react'
import { FillButton, OutlineButton } from '../ButtonComponents';
import ChatBox from '../Components/ChatBox';
import Title from '../Components/Title';

const inter = Inter({ subsets: ['latin'] })

export interface ChatContentTypes {
    Human: string;
    AI: string;
}

export default function Homepage() {
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
                setInputValue('')
                setChatContent([...chatContent, { Human: inputValue, AI: '...' }])
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
                localStorage.setItem('chatContent', JSON.stringify([...chatContent, { Human: inputValue, AI: data }]))
                localStorage.setItem('rememberPrompt', (prompt + `Human:${inputValue}\nAI:${data}\n`))
                setIsLoading(false);
            } catch {
                handleGetAnswer();
            }
        }
    }

    const handleClearHistory = () => {
        localStorage.removeItem('chatContent')
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
        const rememberChatContent = localStorage.getItem('chatContent')
        const rememberPrompt = localStorage.getItem('rememberPrompt')
        if (rememberPrompt && rememberPrompt.length > 0) {
            setPrompt(rememberPrompt)
        }
        if (rememberChatContent && rememberChatContent.length > 0) {
            setChatContent(JSON.parse(rememberChatContent))
        }
    }, [])

    return (
        <div className='descSection relative max-w-8xl w-full pt-12 flex flex-col-reverse lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-12 lg:gap-0'>
            <div className='flex flex-col gap-8 w-2/5 min-w-full lg:min-w-[450px] xl:min-w-[550px]'>
                <Title title='ChatGPT made easy' />
                <p className={`${inter.className} text-slate-300 text-sm sm:text-base lg:text-sm xl:text-base`}><span className='font-bold'>ChatGPT</span> is a chatbot that was launched by <span className='font-bold'>OpenAI</span>, an artificial intelligence research and deployment company, in November 2022.</p>
                <FillButton name='Visit Creator' link="/" />
                <div className='flex items-center gap-5'>
                    <OutlineButton isIcon iconName='pajamas:twitter' link="/" />
                    <OutlineButton isIcon iconName='ri:linkedin-fill' link="/" />
                    <OutlineButton isIcon iconName='mdi:github' link="/" />
                    <OutlineButton isIcon iconName='mdi:telegram' link="/" />
                </div>
            </div>
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
                isRememberChat
                title='Real time chat'
            />
        </div>
    )
}