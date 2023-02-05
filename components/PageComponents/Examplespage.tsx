import { Kanit } from '@next/font/google'
import React from 'react'
import { UltraExtraButton } from '../ButtonComponents'
import { TextExampleList, ImageExampleList } from '../Constants/ExamplePage'

const kanit = Kanit({ subsets: ['latin'], weight: '700' })

export default function Examplespage() {
    return (
        <>
            <div className='relative max-w-8xl w-full pt-12'>
                <div className={`${kanit.className} mb-10 text-bold text-4xl text-purple-600`}>Text Chat Examples</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {TextExampleList.map((example) => (
                        <div className='flex justify-center items-center' key={example.name}>
                            <UltraExtraButton name={example.name} bgIcon={example.icon} action={example.link} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='relative max-w-8xl w-full pt-12'>
                <div className={`${kanit.className} mb-10 text-bold text-4xl text-purple-600`}>Image Examples</div>
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8'>
                    {ImageExampleList.map((example) => (
                        <div className='flex justify-center items-center' key={example.name}>
                            <UltraExtraButton name={example.name} bgIcon={example.icon} action={example.link} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}