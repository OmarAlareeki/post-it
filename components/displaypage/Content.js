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
import DaysAgo from "../DaysAgo";
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
      <p> <DaysAgo post={post} /> </p>
      <p>{post.description} </p>
      <Button variant="contained" onClick={handleContactClick} className={styles.contactBtn}>
        Contact seller
      </Button>
      <ShareBtn className={styles.shareBtn}/>
      {showContacts && (
        <p>
          {" "}
          {post.phone} <br /> {post.email}{" "}
        </p>
      )}
    </>
  );
}
