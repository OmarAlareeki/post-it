import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "./DeleteConfirmation";
import AlertWrapper from "./AlertWrapper";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";

const CardsContainer = ({ posts, deleteBtnStatus }) => {
  const timeNow = new Date();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [dTitle, setDTitle] = useState("");
  const [id, setId] = useState(null);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState(null);
  const [show, setShow] = useState(false);

  console.log(show);

  const handleClick = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

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
    handleClick();
  };

  return (
    <div>
      <div>
        {show ? (
          <AlertWrapper
            message={confirmationMessage}
            show={show}
            handleClose={handleClose}
          />
        ) : (
          ""
        )}
      </div>
      <Container className={style.PostsDisplay}>
        {posts.map((post) => (
          <div key={post.id}>
            <Card className={style.Cards}>
              <Card.Link
                href={`/displaypage/${post.id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img
                  variant="top"
                  src={post.imageUrls}
                  alt={post.title}
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
                    {post.title}
                  </Card.Title>
                  <Card.Text>$ {post.price}</Card.Text>
                  <Card.Text>
                    Posted
                    {Math.floor((timeNow - post.postDate.toDate()) / 3600000) <
                    24
                      ? `${Math.floor(
                          (timeNow - post.postDate.toDate()) / 3600000
                        )} hours`
                      : Math.floor(
                          (timeNow - post.postDate.toDate()) / 3600000 / 24
                        ) > 1
                      ? `${Math.floor(
                          (timeNow - post.postDate.toDate()) / 3600000 / 24
                        )} days`
                      : `${Math.floor(
                          (timeNow - post.postDate.toDate()) / 3600000 / 24
                        )} day`}
                    ago
                  </Card.Text>
                </Card.Body>
              </Card.Link>
            </Card>
            <button
              onClick={() => showDeleteModal(post.id, post.title)}
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
    </div>
  );
};
export default CardsContainer;
