import { useState, useEffect } from "react";
import { db, storage, auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import {collection, getDocs } from 'firebase/firestore'
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

  //   // const querySnapshot = await getDocs(q);
  //   // const posts = querySnapshot.docs.map((doc) => ({
  //   //   id: doc.id,
  //   //   ...doc.data(),
  //   // }));
  //   // setPosts(posts);

  //   // db.firestore()
  //   //   .collection("posts")
  //   // postsRef.getDocs(q).onSnapshot((snap) => {
  //   //   const posts = snap.docs.map((doc) => ({
  //   //     id: doc.id,
  //   //     ...doc.data(),
  //    // }));

  //     const postsRef = db.database().ref("posts");
  //     postsRef
  //       .orderByChild("title")
  //       .equalTo({ searchCriteria })
  //       .on("child_searched", function (snapshot) {
  //         console.log(snapshot.Key);
  //       });
  //    setPosts(posts);
  //   });
  // }, []);

  useEffect(async () => {
    const item = []
    const querySnapshot =  await getDocs(collection(db, "posts"))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     item.push({...doc.data(), "id": doc.id});  
    });
    setDisplayPosts(item);
  }, []);

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
      <NavBar
        postsData={displayPosts}
        previewSearchResults={previewSearchResults}
      />

      <div className={style.mainContainer}>
        <div>
          <SideNavBar />
        </div>
        <div>
          <div className={style.PostsContainer}>
            <div>
              <span> Sort </span>
              <span>Filter</span>
              <button
                onClick={() => postNewItem()}
              >
                Add Post
              </button>
            </div>
            {searchResults && searchResults.length <= 0
              ? <AllPostsList posts={displayPosts} />
              : <SearchPostsList searchResults={searchResults} />}
          </div>
        </div>
      </div>
    </main>
  );
};
export default PostsListContainer;
