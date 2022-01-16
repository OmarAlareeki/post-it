import { useState, useEffect } from "react";
import { db, storage } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import {collection, getDocs } from 'firebase/firestore'
import style from "../styles/Home.module.css";
import { SideNavBar } from "./NavBar/SideNavBar";

const PostsListContainer = () => {
  const [displayPosts, setDisplayPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(async () => {
    const item = []
    const querySnapshot =  await getDocs(collection(db, "posts"))
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
     item.push({...doc.data(), "id": doc.id});  
    });
    setDisplayPosts(item);
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
      </div>
    </main>
  );
};
export default PostsListContainer;
