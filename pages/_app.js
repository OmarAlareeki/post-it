import '../styles/globals.css'
import Head from 'next/head'
import { ThemeProvider, CSSReset } from "@chakra-ui/core";


function MyApp({ Component, pageProps }) {
  console.log()
  return (
    <>
      <Head>
        <title>Post It </title>
        <meta name='description' content='This app helps to keep track of orders' />
        <link rel="icon" href="/post_it.png" />
      </Head>
    
      {/* <ThemeProvider>
        <CSSReset />
      <AuthProvider>*/}
      <Component {...pageProps} />
      {/* </AuthProvider>
      </ThemeProvider> */}
    </>
  )
}

export default MyApp;
