import {useRouter} from "next/router";
import React, { useState, useEffect } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import style from "../../styles/changePassword.module.css";
import { auth } from "../../config/fire-config";
import { updatePassword } from 'firebase/auth'

function changePassword() {
    const [currPassword, setCurrPassword] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [matchAlert, setMatchAlert ] = useState(false)
    const router = useRouter()
    useEffect(() => {
      if (password1 !== password2) {
        setPasswordAlert(true);
      } else if (password1 === password2) {
        setPasswordAlert(false);
      }
      if (currPassword === password2){
          currPassword.length>0?
          setMatchAlert(true):
          setMatchAlert(false)
      }
    }, [currPassword, password1, password2]);
  
    const changePassword = () =>{
        const user = auth.currentUser;
        updatePassword(user, password2)
        .then(()=>{
            router.push('/')
            alert('Password Changed Successfully')
        }).catch((error)=>{
            alert(error)
        })
    }
  
  
    return (
      <>
        <div className={style.passwordContainer}>
          <h1 className="m-4">Change Current Passward</h1>
  
          <div className=''>
            <Form
              validated={true}
              onSubmit={() => signUp()}
            >
              
              <Form.Group className="mb-3" controlId="formGridEmail">
                <Form.Label> Current Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="CurrentPassword"
                  onChange={(e) => setCurrPassword(e.target.value)}
                  minLength={6}
                />
                 <Form.Control.Feedback type="invalid">
                  Password must be longer than 6 characters.
                </Form.Control.Feedback>
              </Form.Group>
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
                <p
                  style={
                    passwordAlert
                      ? { diplay: "block", color: "red" }
                      : { display: "none" }
                  }
                >
                  Password does not match.
                </p>
                <p
                  style={
                    matchAlert
                      ? { diplay: "block", color: "red" }
                      : { display: "none" }
                  }
                >
                  You cannot use the same password.
                </p>
              </Form.Group>
            </Form>
          </div>
          <div className={style.buttonRow}>
          <Button
              className={style.okButton}
              onClick={() => {
                changePassword()
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

export default changePassword