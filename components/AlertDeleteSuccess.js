import { useEffect, useState } from "react";
import { Alert, Button } from "react-bootstrap";

export default function AlertDeleteSuccess({ message }) {
  const [show, setShow] = useState(true);
  console.log(show);

  useEffect(() => {
    show === false ? setShow(true) : "";
  }, [show]);

  return (
    <>
      <Alert show={show} variant="success">
        <Alert.Heading>{message}</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Close me y'all!
          </Button>
        </div>
      </Alert>
    </>
  );
}
