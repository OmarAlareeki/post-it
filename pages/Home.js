import "bootstrap/dist/css/bootstrap.css";
import PostsListContainer from "../components/PostsListContainer";
import NavBar from "../components/NavBar/NavBar";
import { SideNavBar } from "../components/NavBar/SideNavBar"

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
