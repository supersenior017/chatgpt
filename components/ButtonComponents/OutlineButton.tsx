import { useRouter } from 'next/router';
import React from 'react'
import { Icon } from '@iconify/react';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface outlineProps {
    name?: string;
    isIcon?: boolean;
    iconName?: string;
    link?: string;
    action?: string;
}

export default function OutlineButton(props: outlineProps) {
    const { name, isIcon, iconName, link, action } = props
    const router = useRouter();
    return (
        <button className={`${inter.className} relative w-max ${isIcon ? 'sm:p-1.5 p-2 lg:p-1.5 xl:p-2' : 'px-4 py-2 sm:px-5 sm:py-2.5 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5'} relative rounded group overflow-hidden font-medium bg-transparent border border-purple-600 text-purple-600 inline-block`} onClick={() => link ? window.open(link, '_blank') : action && router.push(action)}>
            <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-200 ease-out transform translate-y-0 bg-purple-600 group-hover:h-full opacity-90"></span>
            <span className="relative group-hover:text-white text-sm sm:text-base lg:text-sm xl:text-base">{
                isIcon ? iconName && <Icon icon={iconName} fontSize={24} /> : name
            }</span>
        </button>
    )
}