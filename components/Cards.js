import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";
import DeleteConfirmation from "./DeleteConfirmation";
import { render } from "react-dom";
import AlertDeleteSuccess from "./AlertDeleteSuccess";

const Cards = ({ props, deleteBtnStatus }) => {
  const timeNow = new Date();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [dTitle, setDTitle] = useState("");
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => {
        const ismobile = window.innerWidth < 480;
        if (ismobile !== isMobile) setIsMobile(ismobile);
      },
      false
    );
  }, [isMobile]);

  const showDeleteModal = (id, title) => {
    setDTitle(title);
    setId(id);
    setDeleteMessage(
      `Are you sure you want to delete this Post? Title : ${title}`
    );
    setDisplayConfirmationModal(true);
  };

  // Hide the modal
  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  // Handle the actual deletion of the item
  const submitDelete = async (dTitle, id) => {
    setConfirmationMessage(`${dTitle}  was deleted successfully.`);
    await deleteDoc(doc(db, "posts", id));
    setDisplayConfirmationModal(false);
  };

  return (
    <Container className={style.PostsDisplay}>
      {confirmationMessage ? (
        <AlertDeleteSuccess message={confirmationMessage} />
      ) : (
        ""
      )}
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
                src={prop.imageUrls}
                alt={prop.title}
                className={style.CardImage}
              />
              <Card.Body>
                <Card.Title
                  className="h6"
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
            onClick={() => showDeleteModal(prop.id, prop.title)}
            style={{
              display: deleteBtnStatus ? "block" : "none",
            }}
            className={`${
              !isMobile ? style.DeleteButton : style.DeleteButtonMobile
            }`}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}

      <DeleteConfirmation
        showModal={displayConfirmationModal}
        confirmModal={submitDelete}
        hideModal={hideConfirmationModal}
        dTitle={dTitle}
        id={id}
        message={deleteMessage}
      />
    </Container>
  );
};
export default Cards;
