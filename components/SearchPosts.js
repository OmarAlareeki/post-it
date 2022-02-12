import { useState } from "react";
import Style from "../styles/NavBar.module.css";
import { BsSearch } from "react-icons/bs";
import { PropTypes } from "prop-types";

const SearchPosts = ({ setQueryCriteria }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const handleSearch = () => {
    setQueryCriteria({ searchCriteria: searchedValue });
  };

  const onkeypressed = (e) => {
    if (e.key === "Enter") {
      setQueryCriteria({ searchCriteria: searchedValue });
    }
  };

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
        onKeyUp={onkeypressed}
      />
      <button
        aria-label="search"
        className={Style.SearchButton}
        onClick={handleSearch}
      >
        <BsSearch />
      </button>
    </div>
  );
};

SearchPosts.propTypes = {
  setQueryCriteria: PropTypes.func,
};

export default SearchPosts;
