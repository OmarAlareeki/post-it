import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import style from "../../styles/changePassword.module.css";
import { auth } from "../../config/fire-config";
import { updatePassword } from "firebase/auth";
import AlertWrapper from "../../utils/AlertWrapper";
function changePassword() {
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [passwordAlert, setPasswordAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleClose = () => {
    setShowSuccess(false);
    setShowFailure(false);
    setShowAlert(false);
  };

  useEffect(() => {
    if (password1 !== password2) {
      setPasswordAlert(true);
    } else if (password1 === password2) {
      setPasswordAlert(false);
    }
  }, [password1, password2]);

  const changePassword = () => {
    if (password1 && password2 && password2 === password1) {
      const user = auth.currentUser;
      updatePassword(user, password2)
        .then(() => {
          setShowSuccess(true);
        })
        .catch((error) => {
          setErrorMessage(error.message);
          setShowFailure(true);
        });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <>
      <div className={style.passwordContainer}>
        <AlertWrapper
          message={"Password Changed Successfully"}
          handleClose={handleClose}
          bgColor={"#008000"}
          show={showSuccess}
          route={"/"}
        />
        <AlertWrapper
          message={
            errorMessage.includes("recent")
              ? "Recent sign in is required to change password"
              : { errorMessage }
          }
          handleClose={handleClose}
          bgColor={"#D50005"}
          show={showFailure}
        />
        <AlertWrapper
          message={"Please check provided passwords and try again."}
          handleClose={handleClose}
          bgColor={"#EF9D06"}
          show={showAlert}
        />
        <h1 className="m-4">Change Passward</h1>

        <div className="">
          <Form
            validated={password1 && password2 ? true : false}
            onSubmit={() => signUp()}
          >
            <Form.Group className="mb-3" controlId="validatedPassword1">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                placeholder="New Password"
                type="password"
                onChange={(e) => setPassword1(e.target.value)}
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Password must be longer than 6 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validatePassword2">
              <Form.Label>Re-enter New Password</Form.Label>
              <Form.Control
                placeholder="Re-enter New Password"
                type="password"
                onChange={(e) => setPassword2(e.target.value)}
                minLength={6}
              />
              <Form.Control.Feedback type="invalid">
                Password must be longer than 6 characters.
              </Form.Control.Feedback>
              <small
                style={
                  passwordAlert
                    ? { diplay: "block", color: "red" }
                    : { display: "none" }
                }
              >
                Password does not match.
              </small>
            </Form.Group>
          </Form>
        </div>
        <div className={style.buttonRow}>
          <Button
            className={style.okButton}
            onClick={() => {
              changePassword();
            }}
          >
            Change
          </Button>
          <Button
            variant="light"
            className={style.cancelButton}
            onClick={() => {
              router.push("/");
            }}
          >
            Cancel
          </Button>
        </div>
      </div>
    </>
  );
}

export default changePassword;
