// pages/_app.js
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps, AppType } from 'next/app';
import { appRouter } from 'npm/server/api/root';
import { api } from 'npm/utils/api';

const MyApp: AppType = ({Component, pageProps}: AppProps) => {
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

export default api.withTRPC(MyApp);