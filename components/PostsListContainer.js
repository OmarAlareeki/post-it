import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import Head from "next/head";
import Style from "../styles/Home.module.css";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import SearchPosts from "./NavBar/SearchPosts";
import NavBar from "../components/NavBar/NavBar";

const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .onSnapshot((snap) => {
        const posts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log(posts);
        setPosts(posts);
      });
  }, []);

  const previewSearchResults = (items) => {
    console.log("***********items: " + JSON.stringify(items));
    setSearchResults(items);
  };

  const SearchResultImage = searchResults.map((s) => s.image[0]);
  console.log(SearchResultImage);

  return (
    <Container style={{ marginTop: "10px", marginLeft: "15px" }}>
      <NavBar postsData={posts} previewSearchResults={previewSearchResults} />

      {searchResults.map((searchResult) => (
        <div key={searchResult.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={SearchResultImage}
              alt={searchResult.title}
            />
            <Card.Body>
              <Card.Title>{searchResult.title}</Card.Title>
              <Card.Text>$ {searchResult.price}</Card.Text>
              <Card.Text>
                {searchResult.postDate.toDate().toLocaleDateString() +
                  " " +
                  searchResult.postDate.toDate().toLocaleTimeString()}
              </Card.Text>
              <Card.Link href="www.google.com">Details</Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
};
export default PostsListContainer;
