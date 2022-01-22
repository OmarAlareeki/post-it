import { useState, useEffect } from "react";
import { db, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./NavBar/NavBar";
import AllPostsList from "./AllPostsList";
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
import { Spinner, Button } from "react-bootstrap";

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  const [queryCriteria, setQueryCriteria] = useState({});
  const [currUser, setCurrUser] = useState("");
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);

  onAuthStateChanged(auth, (user) =>
    user ? setCurrUser(user) : setCurrUser("")
  );

  useEffect(() => {
    const postsRef = collection(db, "posts");
    //const userRef = collection(db, "posts");
    let q;

    if (
      !queryCriteria ||
      Object.values(queryCriteria).every((value) => value === undefined)
    ) {
      onSnapshot(postsRef, orderBy("postDate", "desc"), (snap) => {
        const postsArray = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(postsArray);
      });
    } else if (queryCriteria.searchCriteria) {
      onSnapshot(postsRef, orderBy("postDate", "desc"), (snap) => {
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
      const docRef = doc(db, "users", "7hqkVuE26F2qZx6noZhB");
      const docSnap = getDoc(docRef);
      if (docSnap.exists()) {
        const savedArray = docSnap.data().savedPost;
        console.log("**data: " + savedArray);
        setPosts(savedArray);
      } else {
        return;
      }
    } else if (
      queryCriteria.category ||
      queryCriteria.price ||
      queryCriteria.userID
    ) {
      if (queryCriteria.category) {
        q = query(
          postsRef,
          orderBy("postDate", "desc"),
          where("category", "==", queryCriteria.category)
        );
      } else if (queryCriteria.price) {
        q = query(
          postsRef,
          orderBy("postDate", "desc"),
          where("price", "==", queryCriteria.price)
        );
      } else if (queryCriteria.userID) {
        q = query(
          postsRef,
          orderBy("postDate", "desc"),
          where("userId", "==", queryCriteria.userID)
        );
      } //else if (queryCriteria.saved) {
      // q = query(
      //   postsRef,
      //   orderBy("postDate", "desc"),
      //   where("savedPosts", "array-contains", "7hqkVuE26F2qZx6noZhB")
      // );
      //}

      onSnapshot(q, (snap) => {
        const queryList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(queryList);
      });
    }
  }, [queryCriteria]);

  const postNewItem = () => {
    currUser ? Router.push("/postItem") : Router.push("/signIn/SignIn");
  };

  return (
    <main>
      <NavBar setQueryCriteria={setQueryCriteria} />
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setQueryCriteria={setQueryCriteria}
            setDeleteBtnStatus={setDeleteBtnStatus}
          />
        </div>
        <div>
          <div className={style.PostsContainer}>
            <div className={style.SortDiv}>
              <select style={{ marginRight: "30px", border: "solid 2px" }}>
                <option>Sort By...</option>
                <option>Price</option>
                <option>Title</option>
                <option>zipCode</option>
              </select>

              <Button variant="warning" onClick={() => postNewItem()}>
                Add Post
              </Button>
            </div>

            {posts[0] === "Loading..." ? (
              <Spinner
                animation="border"
                className="position-absolute top-50 start-50 translate-middle"
              />
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
              <AllPostsList posts={posts} deleteBtnStatus={deleteBtnStatus} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostsListContainer;
