import style from "../../styles/NavBar.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import SignoutModal from "../../pages/signIn/SignoutModal";
import { auth, db } from "../../config/fire-config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Logo from "./Logo";
import Link from "next/link";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [signoutModal, setSignoutModal] = useState(false);
  const [photo, setPhoto] = useState("");
  const router = useRouter();
  const routeQuery = router.asPath

  useEffect(() => {
    async function authChange() {
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
        console.log(docRef);
        if (docSnap.exists()) {
          console.log(docSnap.data().photo);
          docSnap.data().photo ? setPhoto(docSnap.data().photo) : "";
        } else {
          await setDoc(doc(db, "users", currentUser.uid), {
            accountCreatedDate: new Date(),
            email: currentUser.email,
            name: currentUser.displayName,
            phoneNumber: currentUser.phoneNumber,
            photo: currentUser.photoURL,
            provider: `Login-${currentUser.providerData[0].providerId}`,
            savedPosts: [],
            uid: currentUser.uid,
            zipCode: 0,
          });
        }
      }
    }
    authChange();
  }, [loggedIn]);

  const toggleSignOutModal = () => setSignoutModal(!signoutModal);
  console.log(currentUser);
 
  return (
    <nav className={style.NavContainer}>
      <div className={style.LogoDiv}>
        <Logo />
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
              style={{
                borderRadius: "50%",
                height: "50px",
                width: "50px",
                marginBottom: "0",
              }}
            />
          ) : (
            <FaUserCircle
              style={{
                width: "auto",
                height: "50px",
                fill: "#ef9d06",
                marginBottom: "0",
              }}
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
          />
        )}
        <div className={style.ProfileDiv}>
          <ul className={style.ProfileUl}>
            <li
              className={style.SignIn}
              onClick={() => {
                router.push({
                    pathname: "/signIn/SignIn",
                    query: {
                      routeTo: routeQuery} ,
                    })
                  }}
              style={{
                display: currentUser ? "none" : "block",
                color: "#008000",
              }}
            >
              Sign In
            </li>
            <li
              onClick={toggleSignOutModal}
              style={{
                display: currentUser ? "block" : "none",
                color: "#D50005",
              }}
            >
              Sign Out
            </li>
            <li>
              <Link
                href={
                  currentUser
                    ? `/userProfilePage/${currentUser.uid}`
                    : {
                        pathname: "/signIn/SignIn",
                        query: {
                          routeBack: `/userProfilePage/`,
                        },
                      }
                }
              >
                <span>My Profile</span>
              </Link>
            </li>
          </ul>
        </div>
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
