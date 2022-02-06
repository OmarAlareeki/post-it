import { Alert } from "react-bootstrap";

export default function AlertSuccessWrapper({ message, show, handleClose }) {
  console.log(show);

  return (
    <>
      <Alert
        variant="success"
        onClose={handleClose}
        dismissible
        style={{ backgroundColor: "green", color: "white", height: "50px" }}
      >
        {/* <Alert.Heading>This is a success message!</Alert.Heading> */}
        <p>{message}</p>
      </Alert>
    </>
  );
}
