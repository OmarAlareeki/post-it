import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import PopupDelete from "./DeleteConfirmation";

const Cards = ({ props, deleteBtnStatus }) => {
  const timeNow = new Date();

  return (
    <Container className={style.PostsDisplay}>
      {props.map((prop) => (
        <div key={prop.id}>
          <Card className={style.Cards}>
            <Card.Link
              href={`/displaypage/${prop.id}`}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <Card.Img
                variant="top"
                src={prop.imageUrls}
                alt={prop.title}
                style={{
                  height: "150px",
                }}
              />
              <Card.Body>
                <Card.Title
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textDecoration: "none",
                  }}
                >
                  {prop.title}
                </Card.Title>
                <Card.Text>$ {prop.price}</Card.Text>
                <Card.Text>
                  Posted{" "}
                  {Math.floor((timeNow - prop.postDate.toDate()) / 3600000) < 24
                    ? `${Math.floor(
                        (timeNow - prop.postDate.toDate()) / 3600000
                      )} hours`
                    : Math.floor(
                        (timeNow - prop.postDate.toDate()) / 3600000 / 24
                      ) > 1
                    ? `${Math.floor(
                        (timeNow - prop.postDate.toDate()) / 3600000 / 24
                      )} days`
                    : `${Math.floor(
                        (timeNow - prop.postDate.toDate()) / 3600000 / 24
                      )} day`}{" "}
                  ago
                </Card.Text>
              </Card.Body>
            </Card.Link>
          </Card>
          <button
            onClick={<PopupDelete id={prop.id} />}
            style={{
              display: deleteBtnStatus ? "block" : "none",
              position: "relative",
              top: "-77px",
              right: "-204px",
              backgroundColor: "transparent",
              border: "none",
              fontSize: "25px",
            }}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}
    </Container>
  );
};
export default Cards;
