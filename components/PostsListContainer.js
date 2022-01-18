import { useState, useEffect } from "react";
import { db, storage, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SideNavBar from "./NavBar/SideNavBar";
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import style from "../styles/Home.module.css";
import { SideNavBar } from "./NavBar/SideNavBar";
import { onAuthStateChanged } from "firebase/auth";


const PostsListContainer = () => {
  const [displayPosts, setDisplayPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");
  const [currUser, setCurrUser] = useState('')
  onAuthStateChanged(auth, (user) => user?setCurrUser(user):setCurrUser(""));

  //const [categoryResults, setCategoryResults] = useState([]);
  // useEffect(() => {
  //   // const postsRef = collection(db, "posts");
  //   // const q = query(postsRef, where("title", "==", "Car"));


const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [queryCriteria, setQueryCriteria] = useState({});

  useEffect(() => {
    const postsRef = collection(db, "posts");
    let q;
    if (
      !queryCriteria ||
      Object.values(queryCriteria).every((value) => value === undefined)
      //((value) => value == undefined)
    ) {
      onSnapshot(postsRef, (snap) => {
        const postsArray = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        console.log("posts:" + JSON.stringify(postsArray));


        setPosts(postsArray);
      });
    } else if (queryCriteria.searchCriteria) {
      onSnapshot(postsRef, (snap) => {
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
    } else if (queryCriteria.category || queryCriteria.price) {
      if (queryCriteria.category) {
        q = query(postsRef, where("category", "==", queryCriteria.category));
      } else if (queryCriteria.price) {
        q = query(postsRef, where("price", "==", queryCriteria.price));
      }


      onSnapshot(q, (snap) => {
        const queryList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(queryList);
      });
      // setQueryCriteria({});
    }
  }, [queryCriteria]);



  const postNewItem = () => {
    currUser?
      Router.push("/postItem"):
      Router.push("/signIn/SignIn")
  }

  const previewSearchResults = items => {
    console.log("***********items: " + JSON.stringify(items));
    setSearchResults(items);
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
              <select style={{ marginRight: "30px", border: "solid 2px" }}>
                <option>Sort By...</option>
                <option>Price</option>
                <option>Title</option>
                <option>zipCode</option>
              </select>
              <button
                onClick={() => postNewItem()}
              >
                Add Post
              </button>
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
              <AllPostsList posts={posts} />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostsListContainer;
