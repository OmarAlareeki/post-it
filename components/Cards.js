import React from "react";
import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

const Cards = (prop) => {
  return (
    <div key={prop.id}>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={prop.image} alt={prop.title} />
        <Card.Body>
          <Card.Title>{prop.title}</Card.Title>
          <Card.Text>$ {prop.price}</Card.Text>
          <Card.Text>
            {prop.postDate.toDate().toLocaleDateString() +
              " " +
              prop.postDate.toDate().toLocaleTimeString()}
          </Card.Text>
          <Card.Link href="www.google.com">Details</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Cards;
