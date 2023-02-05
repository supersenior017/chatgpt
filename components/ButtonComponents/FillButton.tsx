import React from 'react'
import { Icon } from '@iconify/react';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface fillProps {
    name?: string;
    isIcon?: boolean;
    iconName?: string;
    link?: string;
    action?: () => void;
}

export default function FillButton(props: fillProps) {
    const { name, isIcon, iconName, link, action } = props;
    return (
        <button className={`${inter.className} relative w-max ${isIcon ? 'sm:p-1.5 p-2 lg:p-1.5 xl:p-2' : 'px-4 py-2 sm:px-5 sm:py-2.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5'} relative rounded group font-medium text-white font-medium inline-block`} onClick={() => link ? window.open(link, '_blank') : action}>
            <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
            <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
            <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
            <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
            <span className="relative text-sm sm:text-base lg:text-sm xl:text-base">{
                isIcon ? iconName && <Icon icon={iconName} fontSize={24} /> : name
            }</span>
        </button>
    )
}
