import '../styles/global.css';
import { AppProps } from 'next/app';
import { theme } from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { GlobalLoader } from '@/components/GlobalLoader';
import { ReactQueryDevtools } from 'react-query/devtools';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      useErrorBoundary: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>

        <GlobalLoader />
      </ChakraProvider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default MyApp;
