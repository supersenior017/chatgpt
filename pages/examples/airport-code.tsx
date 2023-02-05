import Head from 'next/head'
import React from 'react'
import { AirportCodePage } from '@/components/PageComponents'

export default function AirportCode() {
    return (
        <>
            <Head>
                <title>ChatGPT | Airport Code Exractor</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <AirportCodePage />
        </>
    )
}
