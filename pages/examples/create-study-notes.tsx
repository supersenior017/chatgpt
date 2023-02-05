import Head from 'next/head'
import React from 'react'
import { CreateStudyNotespage } from '@/components/PageComponents'

export default function CreateStudyNotes() {
    return (
        <>
            <Head>
                <title>ChatGPT | Create Study Notes</title>
                <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <CreateStudyNotespage />
        </>
    )
}
