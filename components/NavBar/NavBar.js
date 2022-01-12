import { useState } from "react";
import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts";
import nookies  from "nookies"
import Router from "next/router";
import { Button } from "react-bootstrap";


const NavBar = ({ postsData, previewSearchResult, uid}) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const filteredSearchList = (results) => {
    previewSearchResults(results);
    
  };

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
       {loggedIn?<Button onClick={showSignOutModal}>Sign Out</Button>: <Button onClick={()=>{Router.push("/LoginPage")}}>Sign In</Button>}
      </div>
      <div>
      <button onClick={()=>{Router.push('/postItem')}}> 
      Post new Item</button>
    </div>
    </nav>
  );
};
export async function getServerSideProps(context) {
  try {
    const cookies = nookies.get(context);
    const token = await verifyIdToken(cookies.token);
    const { uid } = token;
    return {
      props: { uid:uid },
    };
  } catch (err) {
    context.res.writeHead(302, { Location: "/login" });
    context.res.end();
    return { props: {} };
  }
}
export default NavBar;
