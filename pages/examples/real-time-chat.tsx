import Head from 'next/head'
import React from 'react'
import { RealTimeChatPage } from '@/components/PageComponents'

export default function RealTimeChat() {
    return (
        <>
            <Head>
                <title>ChatGPT | Real Time Chat</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <RealTimeChatPage />
        </>
    )
}
