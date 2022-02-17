import React, { useState } from "react";
import styles from "./Content.module.css";
import {formatDay} from "../DaysAgo";
import ShareBtn from "./ShareBtn"
import Button from '@mui/material/Button';
import { useRouter } from "next/router";
import { auth } from '../../config/fire-config'
import { onAuthStateChanged } from "firebase/auth";

export default function Content({ post, setLoginAlert, currentUser }) {
  const [showContacts, setShowContacts] = useState(false);
  const router = useRouter();
  const handleContactClick = () => {
    if (!currentUser) {
      router.push({
          pathname: "/signIn/SignIn",
          query: {
            routeTo: `displaypage/${post.id}`}
        })
    } else{
      setShowContacts(true)
    }
  };

 onAuthStateChanged(auth, (user)=>
  user?"":setShowContacts(false)
 )

  return (
    <>
      <h2>${post.price} </h2>
      {/* <p> <DaysAgo post={post} /> </p> */}
      <p> {formatDay (post.postDate.seconds)} </p>
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
      <p>{post.description} </p>
    </>
  );
}
