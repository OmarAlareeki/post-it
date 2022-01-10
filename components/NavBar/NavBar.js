import { useState } from "react";
import db from "../../config/fire-config.js";
import style from "../../styles/NavBar.module.css";
import PostsListContainer from "../PostsListContainer.js";
import SearchPosts from "./SearchPosts.js";

const NavBar = ({ postsData, previewSearchResults }) => {
  const filteredSearchList = (results) => {
    previewSearchResults(results);
  };

  return (
    <div className={style.NavBar}>
      <img src="../Logo.jpg" style={{ height: "100px", width: "100px" }} />
      <SearchPosts
        postsData={postsData}
        filteredSearchList={filteredSearchList}
      />
    </div>
  );
};
export default NavBar;
