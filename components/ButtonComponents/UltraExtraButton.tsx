import { useRouter } from 'next/router';
import React from 'react'
import { Icon } from '@iconify/react';
import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface UltraExtraProps {
    name?: string;
    isIcon?: boolean;
    iconName?: string;
    link?: string;
    bgIcon?: string;
    action?: string;
}

export default function UltraExtraButton(props: UltraExtraProps) {
    const { name, isIcon, iconName, bgIcon, link, action } = props;
    const router = useRouter();
    return (
        <button className={`${inter.className} relative w-full inline-flex items-center justify-center p-4 h-36 min-w-[270px] overflow-hidden text-xl tracking-tighter text-white bg-gray-800 rounded-lg group`} onClick={() => link ? window.open(link, '_blank') : action && router.push(action)}>
            <span className={`absolute w-0 h-0 transition-all duration-500 ease-out bg-purple-500 rounded-full group-hover:w-[400px] group-hover:h-80`} />
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className={`relative group-hover:border-white transition-all`}>{
                isIcon ? iconName && <Icon icon={iconName} fontSize={24} /> : name
            }</span>
            {bgIcon && <Icon icon={bgIcon} className="absolute opacity-10 -rotate-[15deg] -right-8 -top-8 text-[150px] scale-100 group-hover:scale-150 transition-all duration-500" />}
        </button>
    )
}
