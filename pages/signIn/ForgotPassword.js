import Router from 'next/router'
import React, { useState } from 'react'
import { Modal, Button, Form, } from 'react-bootstrap'
import { auth } from "../../config/fire-config"
import style from "../../styles/Home.module.css"
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'


function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [successEmailSent, setSuccessEmailSent] = useState
    (false)
  const [failedEmailSent, setFailedEmailSent] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  const auth = getAuth();
  const sendPasswordEmail = () => {
    sendPasswordResetEmail(email)
      .then(() => {
        setSuccessEmailSent(true)
      })
      .catch((error) => {
        setErrMsg(error.message);
        console.log(error.message)
        setFailedEmailSent(true)
        // ..
      });
  }
  const onTryAgain = () => {
    setFailedEmailSent(false)
    setFailedEmailSent(false)
    setEmail('')
  }
  const okayMessage = () => {
    setSuccessEmailSent(false)
    setFailedEmailSent(false)
    setEmail('')
    setErrMsg('')
  }

  return (
    <>
      <div className={style.container}>
        {successEmailSent ?
          <div className='d-flex flex-column' style={{ padding: '20px' }}>
            <p> An email was sent to your address.</p>
            <p> Please follow the instructions to reset Your password</p>
            <Button variant='warning' onClick={() => {
              okayMessage()
              Router.push('/')
            }}>OK</Button>
          </div> :
          (failedEmailSent ?
            (errMsg.includes('invalid-email') ?
              <div className='d-flex flex-column' style={{ padding: '20px' }}> <p>Please provide email address in the following format 'example@domain.com'</p>
                <Button variant='warning' onClick={() => onTryAgain()}> Try Again</Button></div> :
              <div><div className='d-flex flex-column' style={{ padding: '20px' }}> <p> Your email does not match our records. Please check your email or Sign up.</p>
                <Button variant='warning' onClick={() => {
                  okayMessage()
                  Router.push('/')
                }}> OK</Button></div></div>) :

            <div>

              <h1>Reset Password</h1>

              <Form>
                <Form.Group className="m-3" controlId="formGridEmail">
                  <Form.Label> Email Address</Form.Label>
                  <Form.Control type="email" placeholder="name@example.com" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-center border-top-0">
                <Button variant="primary" className="w-25" onClick={() => {
                  sendPasswordEmail()
                }} >
                  Reset Email
                </Button>
              </div>
            </div>)}
      </div>
    </>
  );
}

export default ForgotPassword
