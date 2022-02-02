import React, { useState, useEffect } from "react";
import styles from "./Content.module.css";
import Popup from "./Popup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/fire-config";
import SignInPage from "../../pages/signIn/SignIn";
import { doc, onSnapshot, collection, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { db, storage } from "../../config/fire-config";

export default function Content({ post }) {
    // timestamp= {nanoseconds: 0,
    //     seconds: 1562524200}
    // console.log(new Date(timestamp.seconds*1000))
    console.log(new Date(post.postDate.seconds * 1000))



    const [currentUser, setCurrentUser] = useState("");
    const [user, setUser] = useState(null);
    const [showContacts, setShowContacts] = useState(false);
    const [loginAlert, setLoginAlert] = useState(false);
    const [liked, setLiked] = useState(false);


    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setCurrentUser(user);
                // setLoggedIn(true);
            } else {
                setCurrentUser("");
            }
        });
    }, []);

    useEffect(() => {
        if (!currentUser) return
        const docRef = doc(db, "users", currentUser.uid);
        return onSnapshot(docRef, (doc) => {
            const userDataBase = doc.data();
            setUser(userDataBase);
            setLiked(userDataBase && userDataBase.savedPost && !!userDataBase.savedPost.find((nextPost) => {
                return (nextPost.postId === post.id)
            }))
        })
    }, [currentUser])
    
    console.log({user})

    const handleContactClick = () => {
        if (!currentUser) {
            setLoginAlert(true);
            return
        }
        setShowContacts(true);
    }

    const updateSavedPosts = (savedPost) => {
        updateDoc(doc(db, "users", user.uid), {
            savedPost
          })
    }

    const handleLikeClick = () => {
        if (!currentUser) {
            setLoginAlert(true);
            return
        }
        if (liked) {
            //delete post form savedPost collection for current user
            const newSavedPost = [...(user.savedPost || [])];
            const postIndex = newSavedPost.findIndex((nextPost) => {
                return (nextPost.postId === post.id);
            })
            newSavedPost.splice(postIndex, 1);
            console.log({newSavedPost})
            updateSavedPosts(newSavedPost);
            setLiked(false)
        } else {
            const newSavedPost = [...(user.savedPost || [])];
            newSavedPost.push({ 
                postId: post.id,
                postDate: post.postDate,
                imageUrls: post.imageUrls[0],
                price: post.price,
                title: post.title

             })
            console.log({newSavedPost});
            updateSavedPosts(newSavedPost);
            setLiked(true)
        }

    }

    return (
        <>
            {loginAlert && <Popup close={() => { setLoginAlert(false) }}><SignInPage /></Popup>}
            <button onClick={handleLikeClick}>
                {liked ? (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="grey" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
                </svg>)}
            </button>

            <h1>{post.title} </h1>
            <h2>${post.price} </h2>
            <p> Posted 3 days ago </p>
            <p>{post.description} </p>
            <button onClick={handleContactClick} className={styles.contactBtn}>Contact seller</button>
            {showContacts && <p> {post.phone} <br /> {post.email} </p>}

        </>

    )
}