import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import Style from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import "firebase/storage";

const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [categoryResults, setCategoryResults] = useState([]);

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .onSnapshot((snap) => {
        const posts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(posts);
      });
  }, []);

  const previewSearchResults = (items) => {
    console.log("***********items: " + JSON.stringify(items));
    setSearchResults(items);
  };

  return (
    <main>
      <NavBar postsData={posts} previewSearchResults={previewSearchResults} />

      <div className={Style.PostsContainer}>
        <div>
          <span> Sort </span>
          <span>Filter</span>
          <button>Add Post</button>
        </div>
        {searchResults && searchResults.length <= 0 ? (
          <AllPostsList posts={posts} />
        ) : (
          <SearchPostsList searchResults={searchResults} />
        )}
      </div>
    </main>
  );
};
export default PostsListContainer;
