import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import DeleteConfirmation from "./DeleteConfirmation";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";
import React, { useState, useEffect } from "react";

const DeletePost = ({
  handleClick,
  setConfirmationMessage,
  deleteBtnStatus,
  pid,
  title,
}) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);
  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState(false);
  const [deleteMessage, setDeleteMessage] = useState(null);

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

  const showDeleteModal = (title) => {
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
  const submitDelete = async (title, pid) => {
    const newTitle = title.match(/.{1,3}/g);
    setConfirmationMessage(`${newTitle}  was deleted successfully.`);
    await deleteDoc(doc(db, "posts", pid));
    setDisplayConfirmationModal(false);
    handleClick();
  };

  return (
    <>
      <button
        onClick={() => showDeleteModal(title)}
        style={{
          display: deleteBtnStatus ? "block" : "none",
        }}
        className={`${
          !isMobile ? style.DeleteButtonCard : style.DeleteButtonMobileCard
        }`}
      >
        <RiDeleteBin6Line />
      </button>
      <div>
        <DeleteConfirmation
          showModal={displayConfirmationModal}
          confirmModal={submitDelete}
          hideModal={hideConfirmationModal}
          dTitle={title}
          id={pid}
          message={deleteMessage}
        />
      </div>
    </>
  );
};

export default DeletePost;
