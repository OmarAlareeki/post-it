import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const PostsList = ({ posts }) => {
  return (
    <Container style={{ marginTop: "10px", marginLeft: "15px" }}>
      {posts.map((post) => (
        //<Cards prop={post} />
        <div key={post.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src="https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/images%2FTodoLogo.jpg?alt=media&token=1ee8d6bb-1920-4673-929e-aab0b9590909"
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>$ {post.price}</Card.Text>
              <Card.Text>
                {post.postDate.toDate().toLocaleDateString() +
                  " " +
                  post.postDate.toDate().toLocaleTimeString()}
              </Card.Text>
              <Card.Link href="www.google.com">Details</Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
};

export default PostsList;
