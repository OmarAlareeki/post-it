import "bootstrap/dist/css/bootstrap.css";
import PostsListContainer from "../components/PostsListContainer";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div>
        <PostsListContainer />
      </div>
    </div>
  );
};

export default Home;
