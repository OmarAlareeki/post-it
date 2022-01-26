import React from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";
const Cards = ({ props, deleteBtnStatus }) => {
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
            />
           <Card.Img
                variant="top"
                src={prop.imageUrls}
                alt={prop.title}
                style={{
                  borderTopRightRadius: "28px",
                  borderTopLeftRadius: "28px",
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
                  {prop.postDate.toDate().toLocaleDateString() +
                    " " +
                    prop.postDate.toDate().toLocaleTimeString()}
                </Card.Text>
              </Card.Body>
            </Card.Link>
          </Card>
          <button
            onClick={async () => {
              await deleteDoc(doc(db, "posts", prop.id));
            }}
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