import { useRouter } from 'next/router';
import { Inter, Kanit } from '@next/font/google'
import React from 'react'
import { Player } from '@lottiefiles/react-lottie-player';
import { FillButton, OutlineButton } from '../ButtonComponents';

const inter = Inter({ subsets: ['latin'] })
const kanit = Kanit({ subsets: ['latin'], weight: '700' })

export default function Header() {
    const router = useRouter();
    const pageName = router.pathname === '/' ? 'home' : router.pathname === '/examples' ? 'example' : 'sub-example';
    return (
        <div className='max-w-8xl w-full flex flex-col sm:flex-row justify-between items-start sm:items-center h-28 sm:h-16 z-10'>
            <div className={`${kanit.className} flex items-center text-4xl xl:text-5xl text-slate-200 cursor-pointer`} onClick={() => router.push('/')}>
                I
                <Player
                    autoplay
                    loop
                    src="https://assets7.lottiefiles.com/packages/lf20_kdhv2a5f.json"
                    style={{ height: '60px', width: '60px' }}
                />
                ChatGPT
            </div>
            <div className={`${inter.className} flex items-center gap-5 self-end sm:self-center`}>
                {pageName === 'home' && <OutlineButton name='Examples' action='/examples' />}
                {pageName === 'example' && <OutlineButton isIcon iconName='ic:round-keyboard-arrow-left' action='/' />}
                {pageName === 'sub-example' && <OutlineButton isIcon iconName='ic:round-keyboard-arrow-left' action='/examples' />}
                <FillButton name='Visit Creator' link="/" />
            </div>
        </div>
    )
}
