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
    <div className={style.NavBar}>
      <img
        src="../Post-It-Logo.svg"
        style={{ height: "80px", width: "80px" }}
      />
      <SearchPosts
        postsData={postsData}
        filteredSearchList={filteredSearchList}
      />
      <p>Hi, {currentUser.displayName? currentUser.displayName.split(' ')[0]:'there'}!</p>
       {loggedIn?<Button variant="warning" onClick={toggleSignOutModal}>Sign Out</Button>: <Button onClick={()=>{Router.push("/signIn/SignIn")}}>Sign In</Button>}
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
