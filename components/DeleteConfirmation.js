import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";

import React from "react";
import { Modal, Button } from "react-bootstrap";

const DeleteConfirmation = ({
  showModal,
  hideModal,
  confirmModal,
  id,
  type,
  message,
}) => {
  return (
    <Modal show={showModal} onHide={hideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="alert alert-danger">{message}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="default" onClick={hideModal}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => confirmModal(type, id)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;

// const handleDeleteTrue = async () => {
//   if (popup.show && popup.id) {
//     await deleteDoc(doc(db, "posts", prop.id));
//     setPopup({
//       show: false,
//       id: null,
//     });
//   }
// };
