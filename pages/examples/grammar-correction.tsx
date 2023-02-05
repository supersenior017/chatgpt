import Head from 'next/head'
import React from 'react'
import { GrammarCorrectionPage } from '@/components/PageComponents'

export default function GrammarCorrection() {
    return (
        <>
            <Head>
                <title>ChatGPT | Grammar Correction</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <GrammarCorrectionPage />
        </>
    )
}
