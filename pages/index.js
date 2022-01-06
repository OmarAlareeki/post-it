import { useState, useEffect } from 'react';
import {db} from '../config/fire-config';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Container } from 'react-bootstrap';

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    db.firestore()
      .collection('Posts')
      .onSnapshot(snap => {
        const posts = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log(posts)
        setPosts(posts);
      });
  }, []);

  return (
    <Container>
      <h1 className={styles.mainHeader}>Post It</h1>
      <ul className={styles.listOrders}>
        {posts.map(post =>
          <li key={post.id}>
            <a href=''>{post.title}</a>
          </li>
        )}
      </ul>
    </Container>
  )
}

export default Home;