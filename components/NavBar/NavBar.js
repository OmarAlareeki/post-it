import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts.js";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Router from "next/router";
import SignoutModal from "../../pages/signIn/SignoutModal";
import { auth } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";

const NavBar = ({ setQueryCriteria }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoggedIn(true);
      } else {
        setCurrentUser("");
      }
    });
  }, [loggedIn]);

  const toggleSignOutModal = () => setSignoutModal(!signoutModal);

  return (
    <nav className={style.Nav}>
      <div>
        <img
          src="../Logo3.png"
          className={style.Logo}
          onClick={() => {
            Router.push("/");
          }}
        />
      </div>
      <div>
        <SearchPosts setQueryCriteria={setQueryCriteria} />
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p className="mb-0 mx-2">
          Hi,
          {currentUser.displayName
            ? currentUser.displayName.split(" ")[0]
            : "there"}
          !
        </p>
        {loggedIn ? (
          <FaUserCircle
            style={{
              width: "auto",
              height: "50px",
              fill: "#ef9d06",
              marginBottom: "0",
            }}
            onClick={toggleSignOutModal}
          />
        ) : (
          <FaUserCircle
            style={{
              width: "auto",
              height: "50px",
              marginBottom: "0",
              fill: "#afafaf",
            }}
            onClick={() => {
              Router.push("/signIn/SignIn");
            }}
          />
        )}
      </div>
      <SignoutModal
        show={signoutModal}
        onHide={toggleSignOutModal}
        setLoggedIn={setLoggedIn}
      />
    </nav>
  );
};

export default NavBar;
