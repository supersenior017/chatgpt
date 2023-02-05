import Head from 'next/head'
import { Homepage } from '@/components/PageComponents'

export default function Home() {
  return (
    <>
      <Head>
        <title>ChatGPT | Home</title>
        <meta name="description" content="You can enjoy high quality, artificial intelligence chatbots." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />
    </>
  )
}
