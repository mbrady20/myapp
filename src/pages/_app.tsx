// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import Home from '.';
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';

function MyApp({ Component, pageProps }) {
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