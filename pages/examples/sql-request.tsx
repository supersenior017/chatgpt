import Head from 'next/head'
import React from 'react'
import { SQLRequestPage } from '@/components/PageComponents'

export default function SQLRequest() {
    return (
        <>
            <Head>
                <title>ChatGPT | SQL Request</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <SQLRequestPage />
        </>
    )
}
