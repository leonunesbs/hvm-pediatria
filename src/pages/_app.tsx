import { MainProvider } from '@/context/MainContext';
import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/app';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <MainProvider>
        <Component {...pageProps} />
      </MainProvider>
    </ChakraProvider>
  );
}
