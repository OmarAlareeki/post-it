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
import DaysAgo, { formatDay } from "../DaysAgo";
import ShareBtn from "./ShareBtn"
import Button from '@mui/material/Button';
import NumberFormat from 'react-number-format';

export default function Content({ post, setLoginAlert, currentUser }) {

  const [showContacts, setShowContacts] = useState(false);
   const handleContactClick = () => {
    if (!currentUser) {
      setLoginAlert(true);
      return;
    }
    setShowContacts(true);
  };

  const descrHTML = post.description;

  //adding tag <a> to the links in the string
  function httpHtml(content) {
    const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g;
    return content.replace(reg, "<a href='$1$2'>$1$2</a>");
  } 
  const newDescrption = httpHtml(descrHTML)


  return (
    <>
      {/* <h2>${post.price} </h2> */}
      {(post.price === 0) ? (
        <h2>Free</h2>
      ) : (
          <h2>
            <NumberFormat value={post.price} displayType={'text'} thousandSeparator={true} prefix={'$'} />
          </h2>
        )}

      {/* <p> <DaysAgo post={post} /> </p> */}
      <p> {formatDay(post.postDate.seconds)} </p>
      <div className={styles.buttonsGroup}>
        <Button variant="contained" color="primary" onClick={handleContactClick} className={styles.contactBtn}>
          Contact seller
      </Button>
        <ShareBtn className={styles.shareBtn} />
      </div>
      {showContacts && (
        <p>
          {" "}
          {post.phone} <br /> {post.email}{" "}
        </p>
      )}
      {/* <div
        dangerouslySetInnerHTML={{ __html: descrHTML }}
      /> */}

        <div
          dangerouslySetInnerHTML={{ __html: newDescrption }}
        />

      {/* <p>{post.description} </p> */}
    </>
  );
}
