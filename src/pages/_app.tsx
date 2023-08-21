// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps } from 'next/app';

function MyApp({Component, pageProps}: AppProps) {
  return (
    <ClerkProvider>
    <ChakraProvider>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </ChakraProvider>
    </ClerkProvider>
  )
}

export default MyApp;