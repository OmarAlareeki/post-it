import React, { useState, useEffect } from "react";
import styles from "./Content.module.css";
import {
  doc,
  onSnapshot,
  collection,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { db, storage } from "../../config/fire-config";

export default function Content({ post, setLoginAlert, currentUser }) {
  // timestamp= {nanoseconds: 0,
  //     seconds: 1562524200}
  // console.log(new Date(timestamp.seconds*1000))
  console.log(new Date(post.postDate.seconds * 1000));

  const [showContacts, setShowContacts] = useState(false);

  const handleContactClick = () => {
    if (!currentUser) {
      setLoginAlert(true);
      return;
    }
    setShowContacts(true);
  };

 

  return (
    <>
      <h2>${post.price} </h2>
      <p> Posted 3 days ago </p>
      <p>{post.description} </p>
      <button onClick={handleContactClick} className={styles.contactBtn}>
        Contact seller
      </button>
      {showContacts && (
        <p>
          {" "}
          {post.phone} <br /> {post.email}{" "}
        </p>
      )}
    </>
  );
}
