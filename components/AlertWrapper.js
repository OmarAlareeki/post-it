import { Alert } from "react-bootstrap";

export default function AlertSuccessWrapper({ message, handleClose, bgColor }) {
  return (
    <>
      <Alert
        variant="success"
        onClose={handleClose}
        dismissible
        style={{ backgroundColor: bgColor, color: "white", height: "50px" }}
      >
        <p>{message}</p>
      </Alert>
    </>
  );
}
