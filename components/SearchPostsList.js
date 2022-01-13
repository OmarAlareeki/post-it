import "bootstrap/dist/css/bootstrap.css";
import Cards from "./Cards.js";

const SearchPostsList = ({ searchResults }) => {
  return <Cards props={searchResults} />;
};
export default SearchPostsList;
