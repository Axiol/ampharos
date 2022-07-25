import type { NextPage } from 'next';
import Head from 'next/head';
import { useSession, signIn, signOut } from 'next-auth/react';

import AddLink from '@components/add-link';

const Home: NextPage = () => {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <title>Ampharos - Link shortener</title>
      </Head>

      <div className='bg-gray-100 dark:bg-gray-900 h-screen pt-20'>
        <div className='w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800'>
          <h1 className='text-3xl font-semibold text-center text-gray-700 dark:text-white'>
            Ampharos
          </h1>

          {session ? (
            <>
              <AddLink />

              <p className='mt-8 text-xs font-light text-center text-gray-400'>
                {' '}
                Wanne leave?&nbsp;
                <button
                  onClick={() => signOut()}
                  className='font-medium text-gray-700 dark:text-gray-200 hover:underline'
                >
                  Log out
                </button>
              </p>
            </>
          ) : (
            <>
              <div className='flex items-center justify-between mt-4'>
                <span className='w-full border-b dark:border-gray-600'></span>
                <span className='whitespace-nowrap text-xs text-center text-gray-500 uppercase dark:text-gray-400 mx-4'>
                  Log in
                </span>
                <span className='w-full border-b dark:border-gray-600'></span>
              </div>

              <div className='mt-4'>
                <button
                  onClick={() => signIn('github')}
                  className='w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600'
                >
                  Log in with GitHub
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='inline-block ml-2'
                    viewBox='0 0 16 16'
                  >
                    <path d='M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z' />
                  </svg>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
