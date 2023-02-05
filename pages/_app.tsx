import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Header from '@/components/Components/Header'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className='mainBg relative min-h-screen px-4 sm:px-12 xl:px-24 py-6 sm:py-12 flex flex-col items-center'>
      <div className='bgPattern absolute inset-0 bg-grid-slate-900/[0.04] bg-[bottom_1px_center] dark:bg-grid-slate-400/[0.05] dark:bg-bottom dark:border-b dark:border-slate-100/5' />
      <Header />
      <Component {...pageProps} />
    </main>
  )
}
