// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import Home from '.';
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';
import { AppProps } from 'next/app';

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