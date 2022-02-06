import { useState, useEffect } from "react";
import { db, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./NavBar/NavBar";
import CardsContainer from "./CardsContainer";
import SideNavBar from "./NavBar/SideNavBar";
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

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  const [queryCriteria, setQueryCriteria] = useState({});
  const [currUser, setCurrUser] = useState("");
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [sortValue, setSortValue] = useState("postDate");
  const [sortType, setSortType] = useState("desc");
  const [showPostItem, setShowPostItem] = useState(false);

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
      });
    } else if (queryCriteria.searchCriteria) {
      if (sortValue && sortType) {
        q = query(postsRef, orderBy(sortValue, sortType));
        console.log(q);
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
      });
    } else if (queryCriteria.saved) {
      const docRef = doc(db, "users", currUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().savedPost) {
          const savedArray = docSnap
            .data()
            .savedPost.map((arr) => ({ id: arr.postId, ...arr }));
          setPosts(savedArray);
        } else {
          setPosts([]);
        }
      } else {
        alert(error);
      }
    }
  }, [queryCriteria, sortValue, sortType]);

  const postNewItem = () => {
    currUser ? setShowPostItem(true) : Router.push("/signIn/SignIn");
  };

  return (
    <main>
      <NavBar />
      <div>
        <searchPosts setQueryCriteria={setQueryCriteria} />
      </div>
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setQueryCriteria={setQueryCriteria}
            setDeleteBtnStatus={setDeleteBtnStatus}
            currUser={currUser}
          />
        </div>
        {showPostItem ? (
          <PostItem back={setShowPostItem} />
        ) : (
          <div>
            <div className={style.PostsContainer} style={{ marginTop: "35px" }}>
              <div className={style.SortDiv}>
                <>
                  <select
                    style={{
                      marginRight: "40px",
                      border: "solid 1px #f0f8ff",
                      textAlign: "center",
                      fontSize: ".8rem",
                      background: "#fff",
                    }}
                    onChange={(e) => {
                      setSortValue(e.target.value.split(",")[0]);
                      setSortType(e.target.value.split(",")[1]);
                    }}
                  >
                    <option value="postDate,asc">Sort by</option>
                    <option value="price,asc">Price </option>
                    <option value="price,desc">Price Desc</option>
                    <option value="title,asc">Title</option>
                    <option value="title,desc">Title Desc</option>
                    <option value="postDate,asc">Post Date </option>
                    <option value="postDate,desc">Post Date Desc</option>
                    <option value="zip,desc">Location</option>
                  </select>
                </>
                <Button variant="warning" onClick={() => postNewItem()}>
                  Add Post
                </Button>
              </div>
              {posts[0] === "Loading..." ? (
                <div className={style.mainScreenLoader}>
                  <Rings color="#ef9d06" height={140} width={140} />
                </div>
              ) : posts.length <= 0 ? (
                <div
                  style={{
                    marginRight: "40px",
                    border: "solid 1px #f0f8ff",
                    textAlign: "center",
                    fontSize: ".8rem",
                    background: "#fff",
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
