import React, { useState, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "./DeleteConfirmation";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/fire-config";
import DaysAgo, { formatDay } from "./DaysAgo";
import { route } from "next/dist/server/router";

const CardsContainer = ({
  posts,
  deleteBtnStatus,
  handleClick,
  setConfirmationMessage,
}) => {
  const timeNow = new Date();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [dTitle, setDTitle] = useState("");
  const [id, setId] = useState(null);
  const [viewId, setViewId] = useState("");
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);
  const [view, setView] = useState(0);

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

  // if (viewId) {
  //setView(view + 1);
  //   const docRef = doc(db, "post", viewId);
  //   updateDoc(docRef, { views: view });
  // }

  console.log(view);

  return (
    <div>
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
                  <Card.Text>{post.views}</Card.Text>
                  <Card.Text>{formatDay(post.postDate.seconds)}</Card.Text>
                </Card.Body>
              </Card.Link>
            </Card>
            <button
              onClick={() => showDeleteModal(post.id, post.title)}
              style={{
                display: deleteBtnStatus ? "block" : "none",
              }}
              className={`${
                !isMobile
                  ? style.DeleteButtonCard
                  : style.DeleteButtonMobileCard
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
