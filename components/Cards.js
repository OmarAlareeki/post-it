import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";

const Cards = ({ props }) => {
  console.log(props);

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
                onClick={() => {
                  Router.push("DisplayPostPage");
                }}
              >
                Details
              </Card.Link>
            </Card.Body>
          </Card>
        </div>
      ))}
    </Container>
  );
};

export default Cards;
