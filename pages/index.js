import Head from 'next/head'
import { supabase } from '../utils/supabaseClient'
import ChatApp from './lib/ChatApp';
import LandingPage from './lib/LandingPage';

export default function Home() {
  const user = supabase.auth.user();

  return (
    <>
      <Head>
        <title>Shed Live</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {user ?
        <ChatApp /> : <LandingPage />
      }
    </>
  )
}
