import React, { useState, useEffect } from "react";
import {
    doc,
    updateDoc,
} from "firebase/firestore";
import { db } from "../../config/fire-config";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from "./Title.module.css";
import DeletePostDP from "./DeletePostDP";
import EditPostDP from "./EditPostDP";


export default function Title({ post, setLoginAlert, currentUser, user, setUser }) {
    const liked = user &&
        user.savedPosts &&
        !!user.savedPosts.find((nextPost) => {
            return nextPost.postId === post.id;
        })
    const updateSavedPosts = (savedPosts) => {
        updateDoc(doc(db, "users", user.uid), {
            savedPosts,
        });
        setUser({ ...user, savedPosts });
    };

    const handleLikeClick = () => {
        if (!currentUser) {
            setLoginAlert(true);
            return;
        }
        if (liked) {
            //delete post form savedPost collection for current user
            const newSavedPosts = [...(user.savedPosts || [])];
            const postIndex = newSavedPosts.findIndex((nextPost) => {
                return nextPost.postId === post.id;
            });
            newSavedPosts.splice(postIndex, 1);
            updateSavedPosts(newSavedPosts);
        } else {
            const newSavedPosts = [...(user.savedPosts || [])];
            newSavedPosts.push({
                postId: post.id,
                postDate: post.postDate,
                imageUrls: post.imageUrls[0],
                price: post.price,
                title: post.title,
            });
            updateSavedPosts(newSavedPosts);
        }
    };
    return (
        <div className = {styles.titleWrapper}>
            <span className = {styles.heart} onClick={handleLikeClick}>
                {liked ? (
                        <FavoriteIcon color="action"/>
                ) : (
                        <FavoriteBorderIcon />
                    )}
            </span>
            <h1 className={styles.title}>{post.title} </h1>
            {/* <div className={styles.lineBreak}></div> */}
            <p>
                {/* <DeletePostDP />
                <EditPostDP /> */}
            </p>
        </div>
    )
}