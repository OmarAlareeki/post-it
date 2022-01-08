import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import { useAuth } from '../auth';
import Container from '../components/Container';

const Home = () => {

  const { user } = useAuth();

  return (
    <Container>
        <div>
          <h3>WELCOME TO POST IT!</h3>
          <span>{`User ID: ${user ? user.uid : 'No user signed in'}`}</span>
          <button isDisabled={!user}><Link href='/Home'><a>Protected routes</a></Link></button>
          <button isDisabled={user}><Link href='/login'><a>Login</a></Link></button>
        </div>
    </Container>
  )
}

export default Home;