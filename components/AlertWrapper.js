//import { Alert } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";

export default function AlertSuccessWrapper({
  message,
  handleClose,
  bgColor,
  show,
}) {
  return (
    <>
      <Modal show={show}>
        <Modal.Body>
          <div
            className="alert alert-danger"
            style={{ backgroundColor: bgColor, color: "#fff", border: "none" }}
          >
            {message}
          </div>
          <Button variant="secondary main" onClick={handleClose}>
            Confirm
          </Button>
        </Modal.Body>
      </Modal>
    </>
  );
}

{
  /* <Alert
        variant="success"
        onClose={handleClose}
        className={style.AlertDiv}
        style={{
          backgroundColor: bgColor,
          color: "white",
          height: "fit-content",
          width: "fit-content",
          alignSelf: "center",
        }}
        dismissible
      >
        <p>{message}</p>
      </Alert> */
}
