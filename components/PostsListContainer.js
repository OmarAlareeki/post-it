import { useState, useEffect } from "react";
<<<<<<< HEAD
import { db } from "../config/fire-config";
import Style from "../styles/Home.module.css";
=======
import { db, storage } from "../config/fire-config";
import { Container, Card } from "react-bootstrap";
>>>>>>> master
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import "firebase/storage";

const PostsListContainer = () => {
  const [displayPosts, setDisplayPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
<<<<<<< HEAD
=======

>>>>>>> master

  useEffect(() => {
    db.collection("posts")
      .onSnapshot((snap) => {
        const posts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
<<<<<<< HEAD
        }));
        setPosts(posts);
      });
=======
        }))
        setDisplayPosts(posts);
      })
      console.log(displayPosts)
>>>>>>> master
  }, []);

 

  const previewSearchResults = (items) => {
    console.log("***********items: " + JSON.stringify(items));
    setSearchResults(items);
  };

  return (
<<<<<<< HEAD
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
=======
    <Container style={{ marginTop: "10px", marginLeft: "15px" }}>
      <NavBar postsData={displayPosts} previewSearchResults={previewSearchResults} />
      {/* <img src="https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/images%2FTodoLogo.jpg?alt=media&token=1ee8d6bb-1920-4673-929e-aab0b9590909" /> */}
      <div>
        {searchResults && searchResults.length <= 0 ? (
          <PostsList posts={displayPosts} />
>>>>>>> master
        ) : (
          <SearchPostsList searchResults={searchResults} />
        )}
      </div>
    </main>
  );
};
export default PostsListContainer;
