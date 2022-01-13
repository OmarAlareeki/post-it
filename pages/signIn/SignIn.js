import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import { Form } from "react-bootstrap";
import firebase from "firebase";
import { auth } from "../../config/fire-config";
import GoogleLogin from "react-google-button";
import Router from "next/router";

const SignInPage = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("Error message");

  const login = () => {
    auth
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then(userCredential => {
        console.log(userCredential.user);
        setErrorMessage("");
        Router.push("/");
      })
      .catch(error => {
        const errMsg = error.message;
        if (errMsg.includes("invalid-email")) {
          setErrorMessage(
            "Invalid Email, Please provide email in 'example@domin.com' format"
          );
        } else if (errMsg.includes("user-not-found")) {
          setErrorMessage("User does not exist. Please sign up.");
        } else if (errMsg.includes("INVALID-PASSWORD")) {
          setErrorMessage(
            "The password you proivded does not match our records. Please check your password or click on 'Forgot password'."
          );
        }
      });
  };
  const googleLogin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
      .then(result => {
        var credential = result.credential;
        var token = credential.accessToken;
        var user = result.user;
        console.log(user);
        setErrorMessage("");
      })
      .catch(error => {
        alert("sorry, try again. ", error.code);
      });
  };
  const facebookLogin = () => {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
      .then(() => {
        setErrorMessage("");
      })
      .catch(error => {
        console.log(error.code);
      });
  };
  useEffect(
    () => {
      setErrorMessage("");
    },
    [userEmail, userPassword]
  );

  return (
    <div>
      <h1>Sign In</h1>
     
      <Form
        validated={userEmail || userPassword ? true : false}
        className="px-3 mx-3"
        onSubmit={() => {
          login();
        }}
      >
        <Form.Group className="mb-3" controlId="validateUserEmail">
          <Form.Label className="d-flex align-item-center justify-content-between">
            Email address{" "}
            <div>
              <small style={{ justifyContent: "flex-start" }}>
                Need an account?
                <span
                  style={{ cursor: "pointer", color: "blue" }}
                  className="w-100"
                  onClick={() => Router.push("/signIn/SignUp")}
                >
                  {" "}Sign up{" "}
                </span>
              </small>
            </div>
          </Form.Label>
          <Form.Control
            type="email"
            placeholder="name@example.com"
            onChange={e => {
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
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={e => {
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
        <small>
          {" "}{errorMessage}{" "}
        </small>

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

        <div className="d-flex w-100 justify-content-center mt-3">
          <Button
            variant="primary"
            className="w-50"
            onClick={() => {
              if (userEmail === "" || userPassword === "") {
                //do nothing
              } else if (errorMessage !== "") {
                //do nothing
              } else {
                login();
                setUserEmail("");
                setUserPassword("");
              }
            }}
          >
            Sign In
          </Button>
        </div>
      </Form>
      <hr />
      <p className="m-auto text-center py-3"> Or Login with: </p>
      <div>
        <GoogleLogin
          clientid="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
          buttontext="Login"
          cookiepolicy={"single_host_origin"}
          onClick={() => {
            googleLogin();
            Router.push("/");
          }}
        />
      </div> 
     <button onClick={()=>{
       facebookLogin()
       Router.push("/")}}>Facebook Login</button>
    </div>
  );
};

export default SignInPage;