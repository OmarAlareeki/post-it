import "bootstrap/dist/css/bootstrap.css";
import Cards from "./Cards.js";

const AllPostsList = ({ posts, deleteBtnStatus }) => {
  return (
    <>
      <Cards props={posts} deleteBtnStatus={deleteBtnStatus} />
    </>
  );
};

export default AllPostsList;
