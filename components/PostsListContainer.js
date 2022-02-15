import { useState, useEffect } from "react";
import { db, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./NavBar/NavBar";
import CardsContainer from "./CardsContainer.js";
import SearchPosts from "./SearchPosts.js";
import SideNavBar from "./NavBar/SideNavBar";
import UserProfile from "./UserProfile";
import AlertWrapper from "./AlertWrapper";

import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";
import style from "../styles/Home.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "react-bootstrap";
import PostItem from "./PostItem";
import { Rings } from "react-loader-spinner";
import Sort from "./Sort";

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  const [queryCriteria, setQueryCriteria] = useState({});
  const [currUser, setCurrUser] = useState([]);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [sortValue, setSortValue] = useState("postDate");
  const [sortType, setSortType] = useState("desc");
  const [showPostItem, setShowPostItem] = useState(false);
  const [userProfile, setUserProfile] = useState(false);
  const [show, setShow] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  const currentUserId = currUser.uid;

  onAuthStateChanged(auth, (user) =>
    user ? setCurrUser(user) : setCurrUser("")
  );

  useEffect(async () => {
    const postsRef = collection(db, "posts");
    let q;

    if (
      !queryCriteria ||
      Object.values(queryCriteria).every((value) => value === undefined) ||
      queryCriteria.category ||
      queryCriteria.price ||
      queryCriteria.userID
    ) {
      if (
        !queryCriteria ||
        Object.values(queryCriteria).every((value) => value === undefined)
      ) {
        q = query(postsRef, orderBy(sortValue, sortType));
      } else if (queryCriteria.category) {
        q = query(
          postsRef,
          orderBy(sortValue, sortType),
          where("category", "==", queryCriteria.category)
        );
      } else if (queryCriteria.price) {
        q = query(
          postsRef,
          orderBy("price", "des"),
          orderBy(sortValue, sortType),
          where("price", "<", queryCriteria.price)
        );
      } else if (queryCriteria.userID) {
        q = query(
          postsRef,
          orderBy(sortValue, sortType),
          where("userId", "==", queryCriteria.userID)
        );
      }
      onSnapshot(q, (snap) => {
        const queryList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(queryList);
        setUserProfile(false);
      });
    } else if (queryCriteria.searchCriteria) {
      if (sortValue && sortType) {
        q = query(postsRef, orderBy(sortValue, sortType));
      } else {
        q = query(postsRef, orderBy(sortValue, sortType));
      }
      onSnapshot(q, (snap) => {
        const searchPosts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(
          searchPosts.filter((post) =>
            post.title.toLowerCase().includes(queryCriteria.searchCriteria)
          )
        );
        setUserProfile(false);
      });
    } else if (queryCriteria.saved) {
      const docRef = doc(db, "users", currUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().savedPosts) {
          const savedArray = docSnap
            .data()
            .savedPosts.map((arr) => ({ id: arr.postId, ...arr }));
          setPosts(savedArray);
          setUserProfile(false);
        } else {
          setPosts([]);
          setUserProfile(false);
        }
      } else {
        Router.push("/signIn/SignIn");
      }
    }
  }, [queryCriteria, sortValue, sortType]);

  const postNewItem = () => {
    currUser
      ? setShowPostItem(true) && setUserProfile(false)
      : Router.push("/signIn/SignIn");
  };

  return (
    <main>
      <NavBar setUserProfile={setUserProfile} />
      <div>
        <SearchPosts setQueryCriteria={setQueryCriteria} />
        <>
          {show ? (
            <AlertWrapper
              message={confirmationMessage}
              show={show}
              handleClose={handleClose}
              bgColor="green"
            />
          ) : (
            ""
          )}
        </>
      </div>
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setQueryCriteria={setQueryCriteria}
            setDeleteBtnStatus={setDeleteBtnStatus}
            currUserId={currUser.uid}
          />
        </div>
        <div className={style.SortDiv}>
          <Sort setSortType={setSortType} setSortValue={setSortValue} />
          <div>
            <Button
              variant="warning"
              onClick={() => postNewItem()}
              style={{ backgroundColor: "#ffc107" }}
            >
              Add Post
            </Button>
          </div>
        </div>
        {userProfile ? (
          <UserProfile id={currentUserId} />
        ) : showPostItem ? (
          <PostItem back={setShowPostItem} />
        ) : (
          <div>
            <div className={style.PostsContainer} style={{ marginTop: "35px" }}>
              {userProfile ? (
                <UserProfile
                  id={currentUserId}
                  handleClick={handleClick}
                  setConfirmationMessage={setConfirmationMessage}
                />
              ) : posts[0] === "Loading..." ? (
                <div className={style.mainScreenLoader}>
                  <Rings color="#ef9d06" height={140} width={140} />
                </div>
              ) : posts.length <= 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    padding: "110px",
                    fontSize: "50px",
                  }}
                >
                  OOPS!
                  <br />
                  No results found
                </div>
              ) : (
                <CardsContainer
                  posts={posts}
                  deleteBtnStatus={deleteBtnStatus}
                  handleClick={handleClick}
                  setConfirmationMessage={setConfirmationMessage}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default PostsListContainer;
