import { useState, useEffect } from "react";
import { db, storage, auth } from "../config/fire-config";
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

const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [queryCriteria, setQueryCriteria] = useState({});
  const [currUser, setCurrUser] = useState("");

  onAuthStateChanged(auth, (user) =>
    user ? setCurrUser(user) : setCurrUser("")
  );

  useEffect(() => {
    const postsRef = collection(db, "posts");
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
        console.log(queryCriteria.searchCriteria);
      });
    } else if (queryCriteria.saved) {
      const [savedPosts, setSavedPosts] = useState([]);
      const docRef = doc(
        db,
        "posts",
        queryCriteria.saved.values().next().value
      );
      const getdoc = getDoc(docRef);
      getdoc.then((doc) => {
        setSavedPosts();
        console.log(getdoc.data());
      });
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
      } else if (queryCriteria.saved) {
        // q = query(
        //   postsRef,
        //   orderBy("postDate", "desc"),
        //   where("savedPosts", "array-contains", "7hqkVuE26F2qZx6noZhB")
        // );
      }

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
          <SideNavBar setQueryCriteria={setQueryCriteria} />
        </div>
        <div>
          <div className={style.PostsContainer}>
            <div className={style.SortDiv}>
              <select style={{ 
                  padding: '10px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  background: '#e38a17',
                  color: 'aliceblue',
                  marginRight: '20px',
                }}>
                <option>Sort By...</option>
                <option>Price</option>
                <option>Title</option>
                <option>zipCode</option>
              </select>
              <button 
              onClick={() => postNewItem()} 
              style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: 'none',
                  borderRadius: '5px',
                  background: '#e38a17',
                  color: 'aliceblue',
                  marginRight: '20px',
             }}>Add Post</button>
            </div>

            {posts.length <= 0 ? (
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
              <AllPostsList posts={posts} myposts={queryCriteria.userID} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostsListContainer;
