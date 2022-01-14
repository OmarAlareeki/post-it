import { useState, useEffect } from "react";
import { db, dbQuery } from "../config/fire-config";
import Style from "../styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import AllPostsList from "./AllPostsList";
import SearchPostsList from "./SearchPostsList";
import { collection, getDocs, query, where } from "firebase/firestore";

const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
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
    const searchFilteredList = posts.filter((post) =>
      post.title.toLowerCase().includes(searchCriteria)
    );
    setSearchResults(searchFilteredList);
    console.log("***** Search: " + searchResults);
  }, [searchCriteria]);

  return (
    <main>
      <NavBar setSearchCriteria={setSearchCriteria} />

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
