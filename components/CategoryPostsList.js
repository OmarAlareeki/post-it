import "bootstrap/dist/css/bootstrap.css";
import Cards from "./Cards.js";

const CategoryPostsList = ({ posts }) => {
  return <Cards props={posts} />;
};

export default CategoryPostsList;
