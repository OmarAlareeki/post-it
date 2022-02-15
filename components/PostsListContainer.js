import { useState } from "react";
import { auth } from "../config/fire-config";
import Router from "next/router";
import "bootstrap/dist/css/bootstrap.css";
import CardsContainer from "./CardsContainer.js";
import SearchPosts from "./SearchPosts.js";
import SideNavBar from "./NavBar/SideNavBar";
import AlertWrapper from "./AlertWrapper";
import style from "../styles/Home.module.css";
import { onAuthStateChanged } from "firebase/auth";
import { Button } from "react-bootstrap";
import PostItem from "./PostItem";
import { Rings } from "react-loader-spinner";
import Sort from "./Sort";

const PostsListContainer = () => {
  const [posts, setPosts] = useState(["Loading..."]);
  const [currUser, setCurrUser] = useState([]);
  const [deleteBtnStatus, setDeleteBtnStatus] = useState(false);
  const [sortValue, setSortValue] = useState("postDate");
  const [sortType, setSortType] = useState("desc");
  const [showPostItem, setShowPostItem] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  const handleClick = () => {
    setShowAlert(true);
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const currentUserId = currUser.uid;

  onAuthStateChanged(auth, (user) =>
    user ? setCurrUser(user) : setCurrUser("")
  );

  const postNewItem = () => {
    currUser ? setShowPostItem(true) : Router.push("/signIn/SignIn");
  };

  return (
    <main>
      <div>
        <SearchPosts
          setPosts={setPosts}
          sortType={sortType}
          sortValue={sortValue}
        />
        <>
          {showAlert ? (
            <AlertWrapper
              message={confirmationMessage}
              show={showAlert}
              handleClose={handleClose}
              bgColor="green"
            />
          ) : (
            ""
          )}
        </>
      </div>
      <div className={style.mainContainer}>
        <div>
          <SideNavBar
            setPosts={setPosts}
            sortType={sortType}
            sortValue={sortValue}
            setDeleteBtnStatus={setDeleteBtnStatus}
            currentUserId={currentUserId}
          />
        </div>
        <div className={style.SortDiv}>
          <Sort setSortType={setSortType} setSortValue={setSortValue} />
          <div>
            <Button
              variant="warning"
              onClick={() => postNewItem()}
              style={{ backgroundColor: "#ffc107" }}
            >
              Add Post
            </Button>
          </div>
        </div>
        {showPostItem ? (
          <PostItem back={setShowPostItem} />
        ) : (
          <div>
            <div className={style.PostsContainer} style={{ marginTop: "35px" }}>
              {posts[0] === "Loading..." ? (
                <div className={style.mainScreenLoader}>
                  <Rings color="#ef9d06" height={140} width={140} />
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
                <CardsContainer
                  posts={posts}
                  deleteBtnStatus={deleteBtnStatus}
                  handleClick={handleClick}
                  setConfirmationMessage={setConfirmationMessage}
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
