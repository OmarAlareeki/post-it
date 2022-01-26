import '../styles/globals.css'
import Head from 'next/head'



function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Post It </title>
        <meta name='description' content='This app helps to keep track of orders' />
        <link rel="icon" href="/post_it.png" />
      </Head>
      <Component {...pageProps} />  
    </>
  )
}

export default MyApp;
