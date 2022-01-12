
import { Container, Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const PostsList = ({ posts }) => {
 
  return (
    <Container style={{ marginTop: "10px", marginLeft: "15px" }}>
      {posts? (posts.map((post) => (
        //<Cards prop={post} />
        <div key={post.id}>
          <Card style={{ width: "18rem" }}>
               <Card.Img
               variant="top"
               src={post.imageUrls[0]}
             /> 
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>$ {post.price}</Card.Text>
              <Card.Text>{post.description}</Card.Text>
              <Button variant="light">More info</Button>
            </Card.Body>
          </Card>
        </div>
      ))):""}
    </Container>
  );
};

export default PostsList;
