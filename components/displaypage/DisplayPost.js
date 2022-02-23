import React, { useState, useEffect } from "react";
import Content from "./Content";
import PhotoGallery from "./PhotoGallery";
import Title from "./Title";
import styles from "./DisplayPost.module.css";
import dynamic from 'next/dynamic'
import {
    doc,
    onSnapshot,
    updateDoc,
  } from "firebase/firestore";
import { getDatabase, ref, set } from "firebase/database";
import { db, storage } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../config/fire-config";
import Popup from "./Popup";
import SignInPage from "../../pages/signIn/SignIn";
const Map = dynamic(
    () => import('./Map'),
    { ssr: false }
)
import {useRouter} from "next/router";

export default function DisplayPost({ post }) {
    const [currentUser, setCurrentUser] = useState("");
    const [user, setUser] = useState(null);
    const [loginAlert, setLoginAlert] = useState(false);
    
    const router = useRouter();

    const openLoginPopup = () => {
        setLoginAlert(true);
        if (!router.query.routeTo) {
            router.push(router.asPath+`?routeTo=${router.asPath}`)
        }
    }
    
    useEffect(() => {
        return onAuthStateChanged(auth, (user) => {
            if (user)  {
                setCurrentUser(user);
            }
          else {
                setCurrentUser("");
            }
        });
    }, []);
    useEffect(() => {

        if (!currentUser) {
            setUser(null);
            return;
        } else { setLoginAlert(false) }
        const docRef = doc(db, "users", currentUser.uid);
        return (onSnapshot(docRef, (doc) => {
            const userDataBase = doc.data();
            setUser(userDataBase);

        }));
    }, [currentUser]);


    return (
        <div className={styles.mainContainer}>
            {loginAlert && (
                <Popup
                    close={() => {
                        setLoginAlert(false);
                    }}
                >
                    <SignInPage />
                </Popup>
            )}

            <div className={styles.mainField}>
                <div className={styles.title}>
                    <Title post={post} openLoginPopup={openLoginPopup} currentUser={currentUser} user={user} setUser={setUser}/>
                </div>
                <div className={styles.content}>
                    <Content post={post} openLoginPopup={openLoginPopup} currentUser={currentUser} />
                </div>
                <div className={styles.map}>
                    <Map zip={post.zip} title={post.title} price={post.price} />
                </div>
                <div className={styles.photoGallery}>
                    <PhotoGallery photos={post.imageUrls} />
                </div>
            </div>
        </div>
    )
}






