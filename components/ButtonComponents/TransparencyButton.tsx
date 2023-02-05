import React from 'react'
import { Icon } from '@iconify/react';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface outlineProps {
    name?: string;
    isIcon?: boolean;
    iconName?: string;
    link?: string;
    action?: () => void;
}

export default function TransparencyButton(props: outlineProps) {
    const { name, isIcon, iconName, link, action } = props
    return (
        <button className={`${inter.className} relative ${isIcon ? 'sm:p-1.5 p-2 lg:p-1.5 xl:p-2' : 'px-4 py-2 sm:px-5 sm:py-2.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5'} overflow-hidden font-medium text-gray-600 bg-transprent border-none shadow-inner group outline-none`} onClick={() => link ? window.open(link, '_blank') : action}>
            <span className="absolute top-0 left-0 w-0 h-0 transition-all duration-200 border-t-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 border-gray-600 group-hover:w-full ease"></span>
            <span className="absolute top-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute bottom-0 left-0 w-full h-0 transition-all duration-300 delay-200 bg-gray-600 group-hover:h-full ease"></span>
            <span className="absolute inset-0 w-full h-full duration-300 delay-300 bg-gray-900 opacity-0 group-hover:opacity-100"></span>
            <span className="relative transition-colors duration-300 delay-200 group-hover:text-white text-sm sm:text-base lg:text-sm xl:text-base ease">{
                isIcon ? iconName && <Icon icon={iconName} fontSize={24} /> : name
            }</span>
        </button>
    )
}