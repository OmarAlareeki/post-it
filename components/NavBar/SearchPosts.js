import { useState } from "react";
import Style from "../../styles/NavBar.module.css";
import { BsSearch } from "react-icons/bs";

const SearchPosts = ({ setQueryCriteria }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const handleSearch = () => {
    setQueryCriteria({ searchCriteria: searchedValue });
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
      />
      <button className={Style.SearchButton} onClick={handleSearch}>
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchPosts;
