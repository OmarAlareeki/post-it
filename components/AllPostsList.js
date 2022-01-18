import "bootstrap/dist/css/bootstrap.css";
import Cards from "./Cards.js";

const AllPostsList = ({ posts }) => {
  return (
    <>
      <Cards props={posts} />
    </>
  );
};

export default AllPostsList;
