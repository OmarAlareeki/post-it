import React from 'react'
import { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import Head from 'next/head'
import Container from './Container';
import styles from '../styles/Home.module.css'


const PostsList = props => {

	const [posts, setPosts] = useState([]);
	useEffect(() => {
		fire.firestore()
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
		<div>
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
		</div>
	)
}


export default PostsList
