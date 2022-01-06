import '../styles/globals.css'
import Head from 'next/head'
import db from '../config/fire-config';

function MyApp({ Component, pageProps }) {
  console.log()
  return (
  <>
    <Head>
      <title>Post It </title>
      <meta name='description' content='This app helps to keep track of orders'/>
      <link rel="icon" href="/post_it.png" />
    </Head>
    <Component {...pageProps} />
  </>
  )
}

export default MyApp;
