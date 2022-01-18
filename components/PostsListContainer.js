import { useState, useEffect } from "react";
import { db, storage } from "../config/fire-config";
import Router from "next/router";
import Style from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import SideNavBar from "./NavBar/SideNavBar";
import { collection, getDocs, query, where } from "firebase/firestore";

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

    const searchFilteredList = posts.filter((post) =>
      post.title.toLowerCase().includes(searchCriteria)
    );
    setSearchResults(searchFilteredList);
    console.log("***** Search: " + searchResults);
  }, [searchCriteria]);

  return (
    <main>
      <NavBar setSearchCriteria={setSearchCriteria} />
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
    </main>
  );
};
export default PostsListContainer;
