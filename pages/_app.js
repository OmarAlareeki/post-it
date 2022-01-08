import '../styles/globals.css'
import Head from 'next/head'
import fire from '../config/fire-config';
import { AuthProvider } from '../auth';
// import { ThemeProvider, CSSReset } from '@chakra-ui/core';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </div>
  )
}

export default MyApp;
