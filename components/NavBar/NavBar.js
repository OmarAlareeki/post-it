import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts.js";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import Router from "next/router";
import SignoutModal from "../../pages/signIn/SignoutModal";
import { auth } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
import Logo from "./Logo"

const NavBar = ({ setQueryCriteria }) => {
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);
  const [photo, setPhoto] = useState("");
  
  const currentUserId = currentUser.uid;

  useEffect(async () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoggedIn(true);
      } else {
        setCurrentUser("");
      }
    });

    if (currentUser) {
      const docRef = doc(db, "users", currentUser.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        docSnap.data().photo ? setPhoto(docSnap.data().photo) : "";
      } else {
        Router.push("/signIn/SignIn");
      }
    }
  }, [loggedIn]);

  const toggleSignOutModal = () => setSignoutModal(!signoutModal);

  return (
    <Container>
      <nav className={style.Nav}>
        <Logo />
        <div>
          <SearchPosts setQueryCriteria={setQueryCriteria} />
        </div>
        <div className={style.userIcon}>
          <p>
            Hi,
          {currentUser.displayName
              ? currentUser.displayName.split(" ")[0]
              : "there"}
            !
        </p>
          {loggedIn ? (
          photo ? (
            <img
              src={photo}
              style={{ borderRadius: "50%", height: "50px", marginBottom: "0" }}
              onClick={toggleSignOutModal}
            />
          ) : (
            <FaUserCircle
              style={{
                width: "auto",
                height: "50px",
                fill: "#ef9d06",
                marginBottom: "0",
              }}
              onClick={toggleSignOutModal}
            />
          )
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
    </Container>
  );
};

export default NavBar;
