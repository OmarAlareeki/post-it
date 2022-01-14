import { useState, useEffect } from "react";
<<<<<<< HEAD
import { db, storage } from "../config/fire-config";
import Router from "next/router";
=======
import { db, dbQuery } from "../config/fire-config";
import Style from "../styles/Home.module.css";
>>>>>>> f59c940aac843bdd09bd1f2e5ca8861bfc67b2ad
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
<<<<<<< HEAD
import "firebase/storage";
import style from "../styles/Home.module.css";
import { SideNavBar } from "./NavBar/SideNavBar";
=======
import { collection, getDocs, query, where } from "firebase/firestore";
>>>>>>> f59c940aac843bdd09bd1f2e5ca8861bfc67b2ad

const PostsListContainer = () => {
  const [displayPosts, setDisplayPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  //const [categoryResults, setCategoryResults] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("");

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

  useEffect(() => {
<<<<<<< HEAD
    db.collection("posts").onSnapshot(snap => {
      const posts = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setDisplayPosts(posts);
    });
  }, []);

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
=======
    const searchFilteredList = posts.filter((post) =>
      post.title.toLowerCase().includes(searchCriteria)
    );
    setSearchResults(searchFilteredList);
    console.log("***** Search: " + searchResults);
  }, [searchCriteria]);

  return (
    <main>
      <NavBar setSearchCriteria={setSearchCriteria} />
>>>>>>> f59c940aac843bdd09bd1f2e5ca8861bfc67b2ad

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
                onClick={() => {
                  Router.push("/postItem");
                }}
              >
                Add Post
              </button>
            </div>
            {searchResults && searchResults.length <= 0
              ? <AllPostsList posts={displayPosts} />
              : <SearchPostsList searchResults={searchResults} />}
          </div>
        </div>
<<<<<<< HEAD
=======

        {searchResults && searchResults.length <= 0 ? (
          <AllPostsList posts={posts} />
        ) : (
          <SearchPostsList searchResults={searchResults} />
        )}
>>>>>>> f59c940aac843bdd09bd1f2e5ca8861bfc67b2ad
      </div>
    </main>
  );
};
export default PostsListContainer;
