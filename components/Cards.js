import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";

const Cards = ({ props }) => {
  return (
    <Container className={style.PostsDisplay}>
      {props.map((prop) => (
        <div key={prop.id}>
          <Card
            style={{
              width: "15rem",
              borderRadius: "28px",
              backgroundColor: "#E0E0E0",
              border: "1px solid",
              margin: "20px",
              height: "346px",
            }}
          >
            <Card.Img
              variant="top"
              src={prop.imageUrls}
              alt={prop.title}
              style={{
                borderTopRightRadius: "28px",
                borderTopLeftRadius: "28px",
                height: "179px",
              }}
            />
            <Card.Body>
              <Card.Title>{prop.title}</Card.Title>
              <Card.Text>$ {prop.price}</Card.Text>
              <Card.Text>
                {prop.postDate.toDate().toLocaleDateString() +
                  " " +
                  prop.postDate.toDate().toLocaleTimeString()}
              </Card.Text>
              <Card.Link
                href={`/displaypage/${prop.id}`}
                // as={"/DisplayPage/" + prop.id}
              >
                <a>Details</a>
              </Card.Link>
            </Card.Body>
          </Card>
          <button type="button" onClick={() => {}} style={{ display: "none" }}>
            Delete
          </button>
        </div>
      ))}
    </Container>
  );
};

{
  /* </Link>
 onClick={() => {
  Router.push("DisplayPostPage");
 }} */
}
export default Cards;
