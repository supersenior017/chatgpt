import Head from 'next/head'
import React from 'react'
import { MoodToColorPage } from '@/components/PageComponents'

export default function MoodToColor() {
    return (
        <>
            <Head>
                <title>ChatGPT | Mood to Color</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoodToColorPage />
        </>
    )
}
