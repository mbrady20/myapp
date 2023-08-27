// pages/_app.js
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import RootLayout from './layout';
import { ClerkProvider } from '@clerk/nextjs';
import type { AppProps, AppType } from 'next/app';
import { appRouter } from 'npm/server/api/root';
import { api } from 'npm/utils/api';
import { RecoilRoot } from 'recoil';

const MyApp: AppType = ({Component, pageProps, ...appProps}: AppProps) => {

  const getContent = () => {
    if([`/petQuizData`, `/sign-in`, `/sign-up`].includes(appProps.router.pathname))
      return <Component {...pageProps}/>;

      return(
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
      );
  }
  return (
    <ClerkProvider>
      <RecoilRoot>
    <ChakraProvider>
      {getContent()}
    </ChakraProvider>
    </RecoilRoot>
    </ClerkProvider>
  )
}

export default api.withTRPC(MyApp);