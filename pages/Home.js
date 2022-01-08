import React from 'react'
import PostsList from '../components/PostsList';
import Authenticated from './Authenticated';
import firebase from "firebase/app";

const Home = () => {
    return (
        <div>
            <h1>Welcome to Post It</h1>
            <PostsList />
            <button
					onClick={async () => {
						await firebase.auth().signOut();
						window.location.href = "/";
					}}>Sign out</button>
        </div>
    )
}

export default Home
