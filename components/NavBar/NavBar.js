import style from "../../styles/NavBar.module.css";
import SearchPosts from "./SearchPosts.js";
import { FaUserCircle } from "react-icons/fa";
import { SideNavBar } from "./sideNavBar";

const NavBar = ({ postsData, previewSearchResults }) => {
  const filteredSearchList = (results) => {
    previewSearchResults(results);
  };

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
    </nav>
  );
};
export default NavBar;
