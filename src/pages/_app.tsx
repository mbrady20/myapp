// pages/_app.js
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps, AppType } from 'next/app';
import { appRouter } from 'npm/server/api/root';
import { api } from 'npm/utils/api';

const MyApp: AppType = ({Component, pageProps, ...appProps}: AppProps) => {

  const getContent = () => {
    if([`/petQuizData`].includes(appProps.router.pathname))
      return <Component {...pageProps}/>;

      return(
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      );
  }
  return (
    <ClerkProvider>
    
    <ChakraProvider>
      {getContent()}
    </ChakraProvider>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp);