import { useEffect, useState } from "react";
import Style from "../styles/NavBar.module.css";
import { BsSearch } from "react-icons/bs";
import { PropTypes } from "prop-types";
import { db } from "../config/fire-config";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";

const SearchPosts = ({ setPosts, sortType, sortValue }) => {
  const [searchedValue, setSearchedValue] = useState("");

  useEffect(() => {
    const postsRef = collection(db, "posts");
    const q = query(postsRef, orderBy(sortValue, sortType));

    onSnapshot(q, (snap) => {
      const searchPosts = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(
        searchPosts.filter((post) =>
          post.title.toLowerCase().includes(searchedValue)
        )
      );
    });
  }, [sortType, sortValue, searchedValue]);

  return (
    <div className={Style.SearchContainer}>
      <input
        type="search"
        placeholder="Search"
        className={Style.SearchBar}
        aria-label="Search"
        onChange={({ target }) => {
          setSearchedValue(target.value.toLowerCase());
        }}
      />
      <button aria-label="search" className={Style.SearchButton}>
        <BsSearch />
      </button>
    </div>
  );
};

SearchPosts.propTypes = {
  setPosts: PropTypes.func,
  sortType: PropTypes.string,
  sortValue: PropTypes.string,
};

export default SearchPosts;
