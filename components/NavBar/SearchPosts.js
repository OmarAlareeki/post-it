import { useState } from "react";
import Style from "../../styles/NavBar.module.css";
import { BsSearch } from "react-icons/bs";

const SearchPosts = ({ postsData, filteredSearchList }) => {
  const [searchedValue, setSearchedValue] = useState("");

  const handleSearch = () => {
    const searchList = postsData.filter((post) => post.title == searchedValue);
    console.log("*** SearchList: " + JSON.stringify(searchList));
    filteredSearchList(searchList);
    //searchList.map((item) => <BlockPostPreview key={item.id} item={item} />);
    setSearchedValue(" ");
  };
  console.log(searchedValue);

  return (
    <div className={Style.SearchContainer}>
      <input
        type="search"
        placeholder="Search"
        className={Style.SearchBar}
        aria-label="Search"
        onChange={({ target }) => {
          setSearchedValue(target.value);
        }}
      />
      <button className={Style.SearchButton} onClick={handleSearch}>
        <BsSearch />
      </button>
    </div>
  );
};

export default SearchPosts;
