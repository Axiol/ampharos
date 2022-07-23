import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { useSession, signIn, signOut } from "next-auth/react"

const Home: NextPage = () => {
  const { data: session } = useSession()

  console.log(session)

  return (
    <>
      <Head>
        <title>Ampharos - Link shortener</title>
      </Head>

      <h1>Ampharos</h1>
      {session ? (
        <>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <>
          <button onClick={() => signIn()}>Sign in</button>
        </>
      )}
    </>
  )
}

export default Home
