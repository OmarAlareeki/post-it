import React, { useState, useEffect } from "react";
import { auth } from "../../config/fire-config";
import { Container, Button, Form } from "react-bootstrap";
import GoogleLogin from "react-google-button";
import Router from "next/router";
import style from "../../styles/Home.module.css";
import { FcGoogle } from "react-icons/fc";
import { AiFillFacebook } from "react-icons/ai";

import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithRedirect,
  inMemoryPersistence,
  signInWithCredential,
} from "firebase/auth";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Error message");

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      ).then(()=>{
      setErrorMessage("");
    } catch (error) {
      const errMsg = error.message;
      if (errMsg.includes("invalid-email")) {
        setErrorMessage(
          "Invalid Email, Please provide email in 'example@domin.com' format"
        );
      } else if (errMsg.includes("user-not-found")) {
        setErrorMessage("User does not exist. Please sign up.");
      } else if (errMsg.includes("wrong-password")) {
        setErrorMessage(
          "The password you proivded does not match our records. Please check your password or click on 'Forgot password'."
        );
      }
    });

  const googleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("Signed in Using google");
        console.log(token);
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert("sorry, try again. ", errorMessage);
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  const facebookLogin = () => {
    const provider = new FacebookAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        setErrorMessage("");
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log("Signed in Using Facebook");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setErrorMessage("");
  }, [userEmail, userPassword]);

  return (
    <Container>
      {/* <Logo /> */}
      <div className={style.container}>
        <h1>Sign In</h1>

        <Form
          validated={userEmail && userPassword}
          className="formContainer"
          onSubmit={() => {
            login();
          }}
        >
          <Form.Group className="mb-3" controlId="validateUserEmail">
            <Form.Label className="d-flex align-item-center justify-content-between">
              Email address{" "}
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="name@example.com"
              onChange={(e) => {
                setUserEmail(e.target.value);
                setErrorMessage("");
              }}
              required
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Email.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label className="d-flex align-item-center justify-content-between">
              Password
            </Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setUserPassword(e.target.value);
                setErrorMessage("");
              }}
              required
              minLength={6}
            />
            <Form.Control.Feedback type="invalid">
              Passwords must be at least six letters long.
            </Form.Control.Feedback>
          </Form.Group>
          <small> {errorMessage} </small>

          <small className="">
            <u
              onClick={() => {
                Router.push("/signIn/ForgotPassword");
              }}
              style={{ cursor: "pointer", color: "blue" }}
            >
              Forgot password
            </u>
          </small>

          <div>
            <small style={{ justifyContent: "flex-start" }}>
              Need an account?
              <span
                style={{ cursor: "pointer", color: "blue" }}
                className="w-100"
                onClick={() => Router.push("/signIn/SignUp")}
              >
                {" "}
                Sign up{" "}
              </span>
            </small>
          </div>

          <div className="d-flex w-100 justify-content-center mt-3">
            <Button
              style={{
                background: "#ffc107",
                border: "none",
                color: "black",
                width: "60%",
              }}
              onClick={() => {
                if (userEmail === "" || userPassword === "") {
                  //do nothing
                } else if (errorMessage !== "") {
                  //do nothing
                } else {
                  login();
                  setUserEmail("");
                  setUserPassword("");
                  Router.push("/");
                }
              }}
            >
              Sign In
            </Button>
          </div>
        </Form>
        <hr />
        <p className="m-auto text-center py-3"> Or Login with: </p>
        <div className="d-flex justify-content-center border-top-0">
          <div className={style.providerButtons}>
            <button
              onClick={() => {
                googleLogin();
                Router.push("/");
              }}
            >
              <FcGoogle />
            </button>

            <button
              style={{ color: "#13315f" }}
              className={style.facebookButton}
              onClick={() => {
                facebookLogin();
                console.log("facebook");
                Router.push("/");
              }}
            >
              <AiFillFacebook />
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default SignInPage;
