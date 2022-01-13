
import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts.js";
import { FaUserCircle } from "react-icons/fa";
import { SideNavBar } from "./sideNavBar";
import { useState, useEffect } from "react";
import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts";
import nookies  from "nookies"
import Router from "next/router";
import { Button, Modal } from "react-bootstrap";
import SignoutModal from "../../pages/signIn/SignoutModal"
import { auth } from "../../config/fire-config";



const NavBar = ({ postsData, }) => {
  const [ currentUser, setCurrentUser ] = useState('')
  const [loggedIn, setLoggedIn] = useState(false);
  const [ signoutModal, setSignoutModal ] = useState(false)
  const filteredSearchList = (results) => {
    previewSearchResults(results);
  };
  useEffect(() => {
  auth.onAuthStateChanged(function(user){
    if(user){
      setCurrentUser(user)
      setLoggedIn(true)}
  else{
    setCurrentUser('')
  }
})},[loggedIn])

  const toggleSignOutModal = () => setSignoutModal(!signoutModal)
  
  return (
    <nav>

      <div className={style.TopNavBar}>
        <img src="../Logo3.png" style={{ height: "100px", width: "auto" }} />
        <SearchPosts
          postsData={postsData}
          filteredSearchList={filteredSearchList}
        />
        <button type="button" className={style.UserButton}>
          <FaUserCircle
            style={{
              width: "auto",
              height: "60px",
              margin: "10px",
              padding: "10px",
              fill: "#ef9d06",
            }}
          />
        </button>
      </div>
      <SideNavBar />
      <p>Hi, {currentUser.displayName? currentUser.displayName.split(' ')[0]:'there'}!</p>
              
{loggedIn?  <button type="button" className={style.UserButton} onClick={toggleSignOutModal}>
          <FaUserCircle
            style={{
              width: "auto",
              height: "60px",
              margin: "10px",
              padding: "10px",
              fill: "#ef9d06",
            }}
          /> :
  <button type="button" className={style.UserButton} onClick={()=>{Router.push("/signIn/SignIn")}>
          <FaUserCircle
            style={{
              width: "auto",
              height: "60px",
              margin: "10px",
              padding: "10px",
              fill: "#fafafa",
            }}
          /> 
      </div>
      <div>
        
      <button onClick={()=>{Router.push('/postItem')}}> 
      Post new Item</button>
    </div>
    < SignoutModal show={signoutModal} onHide={toggleSignOutModal} setLoggedIn={setLoggedIn} />

    </nav>
  );
};

export default NavBar;
