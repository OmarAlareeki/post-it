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
  setDoc,
  getDoc,
} from "firebase/firestore";
import style from "../styles/Home.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "react-bootstrap";
import SortBy from "./SortBy";
import PostItem from "./PostItem";
import { Rings } from 'react-loader-spinner'

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  const [queryCriteria, setQueryCriteria] = useState({});
  const [currUser, setCurrUser] = useState("");
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [sortBy, setSortBy] = useState("");
  // const [sortValue, setSortValue] = useState("");
  // const [sortType, setSortType] = useState("");
  const [showPostItem, setShowPostItem] = useState(false);

  onAuthStateChanged(auth, (user) =>
    user ? setCurrUser(user) : setCurrUser("")
  );

  useEffect(async () => {
    if (currUser) {
      await setDoc(doc(db, "users", currUser.uid), {
        name: currUser.displayName,
        email: currUser.email,
        uid: currUser.uid,
      });
    }
  }, [currUser]);

  console.log(sortBy);
  console.log(queryCriteria);
  // console.log(sortValue);
  // console.log(sortType);

  //let sortValue;
  //let sortType;

  // let neworderBy;

  // switch (sortBy) {
  //   case sortBy == "price , sc":
  //     // setSortValue("price");
  //     // setSortType("asc");
  //     neworderBy = `price , asc`;
  //     break;
  // case sortBy == "priceDesc":
  //   sortValue = "price";
  //   sortType = "desc";
  //   break;
  // case sortBy == "titleAsc":
  //   sortValue = "title";
  //   sortType = "asc";
  //   break;
  // case sortBy == "titleDesc":
  //   sortValue = "title";
  //   sortType = "desc";
  //   break;
  // default:
  //   //   sortValue;
  //   //   sortType;
  //   neworderBy = "postDate" + " " + "," + " " + "desc";
  // }

  // console.log(neworderBy);

  useEffect(async () => {
    const postsRef = collection(db, "posts");
    //const userRef = collection(db, "posts");
    let q;

    if (
      !queryCriteria ||
      Object.values(queryCriteria).every((value) => value === undefined) ||
      queryCriteria.category ||
      queryCriteria.price ||
      queryCriteria.userID
    ) {
      if (
        !queryCriteria ||
        Object.values(queryCriteria).every((value) => value === undefined)
      ) {
        q = query(postsRef, orderBy("postDate", "desc"));
      } else if (queryCriteria.category) {
        q = query(
          postsRef,
          orderBy("postDate", "desc"),
          where("category", "==", queryCriteria.category)
        );
      } else if (queryCriteria.price) {
        q = query(
          postsRef,
          orderBy("price", "desc"),
          orderBy("postDate", "desc"),
          where("price", "<", queryCriteria.price)
        );
        console.log(q);
      } else if (queryCriteria.userID) {
        q = query(
          postsRef,
          orderBy("postDate", "desc"),
          where("userId", "==", queryCriteria.userID)
        );
      }
      else if (queryCriteria.saved) {
        const docRef = doc(db, "users", currUser.uid);
        q = query(
          docRef,
          orderBy("postDate", "desc"),
          where("savedPosts", "array-contains", "7hqkVuE26F2qZx6noZhB")
        );
      }
      onSnapshot(q, (snap) => {
        const queryList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(queryList);
        console.log(queryList);
      });
    } else if (queryCriteria.searchCriteria) {
      if (sortBy) {
        q = query(postsRef, orderBy(sortBy));
        console.log(q);
      } else {
        q = query(postsRef, orderBy("postDate", "desc"));
      }
      onSnapshot(q, (snap) => {
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
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().savedPost) {
          const savedArray = docSnap
            .data()
            .savedPost.map((arr) => ({ id: arr.postId, ...arr }));
          console.log(savedArray);
          setPosts(savedArray);
        } else {
          alert("You have not saved any Posts");
        }
      } else {
        console.log(error);
      }
    }
  }, [queryCriteria, sortBy]);

  const postNewItem = () => {
    // currUser ? Router.push("/postItem") : Router.push("/signIn/SignIn");
    currUser ? setShowPostItem(true) : Router.push("/signIn/SignIn");
  };

  return (
    <main>
      <NavBar setQueryCriteria={setQueryCriteria} />
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setQueryCriteria={setQueryCriteria}
            setDeleteBtnStatus={setDeleteBtnStatus}
            currUser={currUser}
          />
        </div>
        {showPostItem ? (
          <PostItem back={setShowPostItem} />
        ) : (
            <div>
              <div className={style.PostsContainer} style={{ marginTop: '35px' }}>
                <div className={style.SortDiv}>
                  <SortBy setSortBy={setSortBy} />
                  <Button variant="warning" onClick={() => postNewItem()}>
                    Add Post
                </Button>
                </div>
                {posts[0] === "Loading..." ? (
                  <div className={style.mainScreenLoader} >
                    <Rings
                      color="#ef9d06"
                      height={140}
                      width={140}
                    />
                  </div>
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
                      <AllPostsList
                        posts={posts}
                        deleteBtnStatus={deleteBtnStatus}
                      />
                    )}
              </div>
            </div>
          )}
      </div>
    </main>
  );
};
export default PostsListContainer;