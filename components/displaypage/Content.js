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
import DaysAgo, {formatDay} from "../DaysAgo";
import ShareBtn from "./ShareBtn"
import Button from '@mui/material/Button';


export default function Content({ post, setLoginAlert, currentUser }) {
  
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
      {/* <p> <DaysAgo post={post} /> </p> */}
      <p> {formatDay (post.postDate.seconds)} </p>
      <div className={styles.buttonsGroup}>
      <Button variant="contained" color="primary" onClick={handleContactClick} className={styles.contactBtn}>
        Contact seller
      </Button>
      <ShareBtn className={styles.shareBtn}/>
      </div>
      {showContacts && (
        <p>
          {" "}
          {post.phone} <br /> {post.email}{" "}
        </p>
      )}
      <p>{post.description} </p>
    </>
  );
}
