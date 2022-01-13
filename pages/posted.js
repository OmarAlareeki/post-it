import React, { useState } from "react";
import { db, storage } from "../config/fire-config";
import { Card, Button, Carousel } from "react-bootstrap";
import Router from "next/router";
import style from "../styles/Home.module.css";

const posted = () => {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div className={style.postedMain}>
        <h1> Your item was posted successfully</h1>
      <Card style={{ width: "20rem" }}>
        <Carousel activeIndex={index} onSelect={handleSelect}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src=""
              alt="First slide"
            />
          </Carousel.Item>
        </Carousel>
        <Card.Body>
          <Card.Title>Item name</Card.Title>
          <Card.Subtitle>$ price</Card.Subtitle>
          <Card.Subtitle>Category</Card.Subtitle>
          <Card.Text>Details</Card.Text>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/");
            }}
          >
            Back to Main Page
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default posted;

