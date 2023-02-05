import Head from 'next/head'
import React from 'react'
import { MovieToEmojipage } from '@/components/PageComponents'

export default function MovieToEmoji() {
    return (
        <>
            <Head>
                <title>ChatGPT | Movie To Emoji</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MovieToEmojipage />
        </>
    )
}
