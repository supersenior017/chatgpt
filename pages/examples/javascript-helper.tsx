import Head from 'next/head'
import React from 'react'
import { JavaScriptHelperChatbotpage } from '@/components/PageComponents'

export default function JavaScriptHelperChatbot() {
    return (
        <>
            <Head>
                <title>ChatGPT | JavaScript Helper Chatbot</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <JavaScriptHelperChatbotpage />
        </>
    )
}
