import { Inter } from '@next/font/google'
import React, { Dispatch, RefObject, SetStateAction, useEffect, useState } from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { Icon } from '@iconify/react';
import { TransparencyButton } from '../ButtonComponents';
import { MoodChatContentTypes } from '../PageComponents/MoodToColorpage';
import { LanguageList } from '../Constants/LanguageList';

const inter = Inter({ subsets: ['latin'] })

interface ChatBoxTypes {
    clearFunc: () => void;
    getAnswerFunc: () => void;
    setInputValue: Dispatch<SetStateAction<string>>;
    chatContent: MoodChatContentTypes[];
    isLoading: boolean;
    inputValue: string;
    chatBoxRef: RefObject<HTMLDivElement>;
    inputRef: RefObject<HTMLInputElement>;
    isRememberChat: boolean;
    isShowHint: string;
    setIsShowHint: Dispatch<SetStateAction<string>>;
    isShowHistory?: boolean;
    setIsShowHistory?: Dispatch<SetStateAction<boolean>>;
    showSelectLanguages?: boolean;
    setShowSelectLanguages?: Dispatch<SetStateAction<boolean>>;
    selectedLanguages?: string[];
    setSelectedLanguages?: Dispatch<SetStateAction<string[]>>;
    isSelectLanguages?: boolean;
    moodColor?: string;
    title: string;
}

export default function ChatBox({
    clearFunc,
    getAnswerFunc,
    setInputValue,
    chatContent,
    isLoading,
    inputValue,
    chatBoxRef,
    inputRef,
    isRememberChat,
    isShowHint,
    setIsShowHint,
    isShowHistory,
    setIsShowHistory,
    showSelectLanguages,
    setShowSelectLanguages,
    selectedLanguages,
    setSelectedLanguages,
    isSelectLanguages,
    moodColor,
    title
}: ChatBoxTypes) {
    const overview = 'I am prepared to speak with you. Fire away!';

    const [allLanguages, setAllLanguages] = useState<string[]>(LanguageList);
    const [searchLangInput, setSearchLangInput] = useState<string>('');

    const handleKeyDown = (event: React.KeyboardEvent) => {
        setIsShowHint('')
        if (event.key === 'Enter') {
            getAnswerFunc()
        }
    }

    const handleShowHistory = () => {
        if (setIsShowHistory) {
            if (setShowSelectLanguages) {
                setShowSelectLanguages(false)
            }
            setIsShowHistory(true)
            setIsShowHint('')
        }
    }

    const handleHiddenHistory = () => {
        if (setIsShowHistory) {
            if (setShowSelectLanguages) {
                setShowSelectLanguages(false)
            }
            setIsShowHistory(false)
            setIsShowHint('')
        }
    }

    const handleClickLanguages = (language: string) => {
        if (selectedLanguages && setSelectedLanguages) {
            if (selectedLanguages.includes(language)) {
                const deSelectedLanguages = selectedLanguages.filter(item => item !== language);
                setSelectedLanguages(deSelectedLanguages);
                const result = handleFilterLangs(searchLangInput, deSelectedLanguages);
                setAllLanguages(result);
                localStorage.setItem('selectedLangs', JSON.stringify(deSelectedLanguages))
            } else {
                const selectedLangs = [...selectedLanguages, language]
                setSelectedLanguages(selectedLangs);
                setAllLanguages(allLanguages.filter(item => item !== language));
                localStorage.setItem('selectedLangs', JSON.stringify(selectedLangs))
            }
        }
    }

    const handleSearchLanguageInput = (e: string) => {
        if (selectedLanguages) {
            setSearchLangInput(e);
            const result = handleFilterLangs(e, selectedLanguages);
            setAllLanguages(result);
        }
    }

    const handleFilterLangs = (value: string, langsArray: string[]) => {
        const searchResult = LanguageList.filter(item => item.toLocaleLowerCase().includes(value.toLocaleLowerCase()));
        const finalResult = searchResult.filter(item => !langsArray.includes(item));
        return finalResult;
    }

    useEffect(() => {
        const selectedLangs = localStorage.getItem('selectedLangs')
        if (selectedLangs && JSON.parse(selectedLangs).length > 0) {
            if (setSelectedLanguages) {
                setSelectedLanguages(JSON.parse(selectedLangs));
            }
            const result = handleFilterLangs('', JSON.parse(selectedLangs))
            setAllLanguages(result)
        } else {
            setAllLanguages(LanguageList)
        }
    }, [JSON.stringify(selectedLanguages)])

    useEffect(() => {
        if (inputRef) {
            inputRef.current?.focus()
        }
        if (chatBoxRef && !showSelectLanguages) {
            chatBoxRef.current?.scrollTo({ top: chatBoxRef.current.scrollHeight, behavior: "smooth" });
        }
    }, [JSON.stringify(chatContent)])

    useEffect(() => {
        handleSearchLanguageInput(searchLangInput)
    }, [searchLangInput])

    const SelectLanguages = (
        <div
            className='absolute bottom-1 right-2 underline underline-offset-2 cursor-pointer'
            onClick={() => {
                setShowSelectLanguages && setShowSelectLanguages(true)
                setSearchLangInput('')
                setIsShowHint('')
            }}
        >
            Select Languages
        </div>
    )

    const arrowAnimation = (
        <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_uxud7cot.json"
            style={{ height: '50px', width: '50px' }}
        />
    )

    return (
        <div className={`${inter.className} relative max-w-auto lg:max-w-xl w-full text-md self-center`} id='chatBox'>
            <div className='h-6 bg-slate-800 rounded-t-md flex items-center justify-between px-4'>
                <div className='text-sm justify-self-start text-slate-300'>{title}</div>
                <div className='flex items-center gap-2'>
                    {!isRememberChat ? (
                        <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-green-600 transition-all hover:w-12 group' onClick={() => handleHiddenHistory()}>
                            <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>home</div>
                        </div>
                    ) : (
                        <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-green-600' />
                    )}
                    {!isRememberChat ? (
                        <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-yellow-600 transition-all hover:w-12 group' onClick={() => handleShowHistory()}>
                            <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>history</div>
                        </div>
                    ) : (
                        <div className='w-3.5 h-3.5 cursor-pointer rounded-full bg-yellow-600' />
                    )}
                    <div className='w-3.5 h-3.5 flex items-center justify-center cursor-pointer rounded-full bg-rose-600 transition-all hover:w-12 group' onClick={() => clearFunc()}>
                        <div className='opacity-0 group-hover:opacity-100 text-xs transition-all'>reset</div>
                    </div>
                </div>
            </div>
            <div className={`h-[450px] relative bg-[#00000080] p-5 text-slate-300 flex flex-col gap-3 overflow-auto text-sm`} ref={chatBoxRef}>
                {isRememberChat ?
                    chatContent.length > 0 ? (
                        chatContent.map((chat, index) => (
                            <div className='flex flex-col gap-2' key={index}>
                                <div className='bg-purple-600 max-w-[250px] sm:max-w-sm md:max-w-md lg:max-w-xs rounded-md p-2 w-max self-end'>{chat.Human}</div>
                                <div className='bg-slate-600 max-w-[250px] sm:max-w-sm md:max-w-md lg:max-w-xs rounded-md p-2 w-max'>
                                    {isLoading && chatContent.length - 1 === index ? (
                                        <Player
                                            autoplay
                                            loop
                                            src="https://assets1.lottiefiles.com/packages/lf20_fyye8szy.json"
                                            style={{ height: '50px', width: '50px', marginBottom: '-15px', marginTop: '-15px' }}
                                        />
                                    ) : chat.AI}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            <Player
                                autoplay
                                loop
                                src="https://assets7.lottiefiles.com/packages/lf20_pmgmuthj.json"
                                style={{ height: '250px', width: '250px' }}
                            />
                            <div>{overview}</div>
                        </div>
                    ) : isLoading ? (
                        <Player
                            autoplay
                            loop
                            src="https://assets1.lottiefiles.com/packages/lf20_fyye8szy.json"
                            style={{ height: '50px', width: '50px' }}
                        />
                    ) : showSelectLanguages ? (
                        <div className='flex flex-col gap-4'>
                            <div className='flex items-center gap-2'>
                                <div className='w-6 h-6 rounded-full bg-green-600 flex items-center justify-center cursor-pointer' onClick={() => handleHiddenHistory()}>
                                    <Icon icon='ic:round-keyboard-arrow-left' className='text-2xl' />
                                </div>
                                <div className='w-36 h-6 flex items-center justify-center rounded-full bg-transition border border-yellow-600 text-yellow-600 cursor-pointer'>Select Languages</div>
                            </div>
                            <input
                                className='mx-3 sm:mx-4 rounded-full py-2 px-4 outline-none border-none'
                                onChange={(e) => handleSearchLanguageInput(e.target.value)}
                                value={searchLangInput}
                            />
                            <div className='px-4'>
                                <div>Selected</div>
                                <div className='flex flex-wrap gap-2 p-1'>
                                    {selectedLanguages && selectedLanguages.map((language) => (
                                        <div
                                            className={`flex items-center justify-center bg-purple-500 text-white border border-purple-500 w-max px-3 h-6 rounded-full cursor-pointer transition-all duration-500`}
                                            onClick={() => handleClickLanguages(language)}
                                            key={language}
                                        >
                                            {selectedLanguages.includes(language) ? (
                                                <div className='flex items-center'>
                                                    <Icon icon='material-symbols:check' className='text-xl' />
                                                    {language}
                                                </div>
                                            ) : (
                                                language
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className='px-4'>
                                <div>All</div>
                                <div className='flex flex-wrap gap-2 p-1'>
                                    {allLanguages.map((language) => (
                                        <div
                                            className={`flex items-center justify-center bg-transparent text-purple-500 border border-purple-500 w-max px-3 h-6 rounded-full cursor-pointer transition-all duration-500`}
                                            onClick={() => handleClickLanguages(language)}
                                            key={language}
                                        >
                                            {selectedLanguages && selectedLanguages.includes(language) ? (
                                                <div className='flex items-center'>
                                                    <Icon icon='material-symbols:check' className='text-xl' />
                                                    {language}
                                                </div>
                                            ) : (
                                                language
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ) : isShowHistory ? (
                        <>
                            <div className='flex items-center gap-2'>
                                <div className='w-6 h-6 rounded-full bg-green-600 flex items-center justify-center cursor-pointer' onClick={() => handleHiddenHistory()}>
                                    <Icon icon='ic:round-keyboard-arrow-left' className='text-2xl' />
                                </div>
                                <div className='w-28 h-6 flex items-center justify-center rounded-full bg-transition border border-yellow-600 text-yellow-600 cursor-pointer'>History</div>
                                <div className='w-6 h-6 rounded-full bg-rose-600 flex items-center justify-center cursor-pointer' onClick={() => clearFunc()}>
                                    <Icon icon='material-symbols:delete' className='text-xl' />
                                </div>
                            </div>
                            <div className='px-5 py-2 flex flex-col gap-4'>
                                {chatContent.length === 0 ? (
                                    <div>No History!</div>
                                ) : chatContent.map((chat, index) => (
                                    <div className='flex flex-col gap-1' key={index}>
                                        <div>{chat.Human}</div>
                                        <div className={`whitespace-pre-line ${moodColor ? 'p-2 px-4 rounded-full' : 'text-orange-200'}`} style={{ backgroundColor: chat.Color }}>{chat.AI}</div>
                                    </div>
                                ))}
                            </div>
                            {isSelectLanguages && SelectLanguages}
                        </>
                    ) : chatContent.length > 0 ? (
                        <>
                            {selectedLanguages && selectedLanguages.length > 0 && (
                                <div className='w-full flex flex-wrap gap-2 absolute top-0 left-0 p-2 bg-[#000000030]'>
                                    {selectedLanguages.map((language) => (
                                        <div key={language} className="bg-purple-600 w-max px-2 rounded-full">
                                            {language}
                                        </div>
                                    ))}
                                </div>
                            )}
                            {isSelectLanguages && SelectLanguages}
                            <div className='text-base text-center'>{chatContent[chatContent.length - 1].Human}</div>
                            <div className={`text-base text-center whitespace-pre-line ${!moodColor ? 'text-orange-200' : 'p-2 px-4 rounded-full'}`} style={moodColor !== '' ? { backgroundColor: moodColor } : { backgroundColor: 'transparent' }}>{chatContent[chatContent.length - 1].AI}</div>
                        </>
                    ) : (
                        <div className='w-full h-full flex flex-col items-center justify-center'>
                            {selectedLanguages && selectedLanguages.length > 0 && (
                                <div className='w-full flex flex-wrap gap-2 absolute top-0 left-0 p-2 bg-[#000000030]'>
                                    {selectedLanguages.map((language) => (
                                        <div key={language} className="bg-purple-600 w-max px-2 rounded-full">
                                            {language}
                                        </div>
                                    ))}
                                </div>
                            )}
                            <Player
                                autoplay
                                loop
                                src="https://assets7.lottiefiles.com/packages/lf20_pmgmuthj.json"
                                style={{ height: '250px', width: '250px' }}
                            />
                            <div>{overview}</div>
                            {isSelectLanguages && SelectLanguages}
                        </div>
                    )
                }
            </div>
            {isShowHint === 'input' && <div className='absolute bottom-10 left-0'>
                {arrowAnimation}
            </div>}
            {isShowHint === 'language' && <div className={`absolute ${showSelectLanguages ? 'top-8 left-48 rotate-90' : 'bottom-7 right-32 -rotate-90'}`}>
                {arrowAnimation}
            </div>}
            <div className='w-full bg-slate-800 rounded-b-md flex overflow-hidden'>
                <input
                    className='w-full bg-slate-800 outline-none border-none rounded-b-md py-2 px-4'
                    placeholder='Ask me anything...'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => handleKeyDown(e)}
                    disabled={isLoading}
                    ref={inputRef}
                    autoFocus
                />
                <TransparencyButton isIcon iconName='material-symbols:send' action={() => getAnswerFunc()} />
            </div>
        </div>
    )
}