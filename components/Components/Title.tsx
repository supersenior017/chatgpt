import { Kanit } from '@next/font/google'
import React from 'react'
import styles from '@/styles/Home.module.css'

const kanit = Kanit({ subsets: ['latin'], weight: '700' })

interface TitleTypes {
    title: string;
    size?: string;
}

export default function Title({
    title,
    size
}: TitleTypes) {
    return (
        <div className={`${styles.descTitleGroup}`}>
            <div className={`${kanit.className} ${styles.descTitle} ${size === 'small' ? 'text-6xl sm:text-7xl lg:text-6xl xl:text-7xl' : 'text-7xl sm:text-8xl lg:text-7xl xl:text-8xl'}`}>{title}</div>
            <div className={`${kanit.className} ${styles.descTitle} ${size === 'small' ? 'text-6xl sm:text-7xl lg:text-6xl xl:text-7xl' : 'text-7xl sm:text-8xl lg:text-7xl xl:text-8xl'}`}>{title}</div>
            <div className={`${kanit.className} ${styles.descTitle} ${size === 'small' ? 'text-6xl sm:text-7xl lg:text-6xl xl:text-7xl' : 'text-7xl sm:text-8xl lg:text-7xl xl:text-8xl'}`}>{title}</div>
        </div>
    )
}
