import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import Head from "next/head";
import Style from "../styles/Home.module.css";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "../components/NavBar/NavBar";
import PostsList from "./PostsList";
import "firebase/storage";

const PostsListContainer = () => {
  const [posts, setPosts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [url, setUrl] = useState("");

  useEffect(() => {
    db.firestore()
      .collection("posts")
      .onSnapshot((snap) => {
        const posts = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("***Posts: " + JSON.stringify(posts[0]));
        //const pathVal = posts[0].images[0].path;
        posts.map((post) => {
          //const imageUrl = post.image[0].path;
          db.storage()
            .ref("")
            .child("")
            .getDownloadURL()
            .then((url) => {
              setUrl(url);
              console.log("Hi:" + url);
              console.log(post.image[0].path);
            });
        });
        //console.log("***Image: " + posts[0].image[0].path);

        setPosts(posts);
      });
  }, []);

  console.log(posts);

  //console.log("**** Images:*** " + posts[0].image);

  const previewSearchResults = (items) => {
    console.log("***********items: " + JSON.stringify(items));
    setSearchResults(items);
  };

  return (
    <Container style={{ marginTop: "10px", marginLeft: "15px" }}>
      <NavBar postsData={posts} previewSearchResults={previewSearchResults} />
      <img src="https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/images%2FTodoLogo.jpg?alt=media&token=1ee8d6bb-1920-4673-929e-aab0b9590909" />
      <div>
        {searchResults && searchResults.length <= 0 ? (
          <PostsList posts={posts} />
        ) : (
          <>
            {searchResults.map((searchResult) => (
              <div key={searchResult.id}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src="https://www.montblanc.com/variants/images/34480784411792216/A/w747.jpg"
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
          </>
        )}
      </div>
    </Container>
  );
};
export default PostsListContainer;
