import React from 'react'
import { auth } from "../../config/fire-config"
import { Modal, Button, } from 'react-bootstrap'

function SignoutModal({ show, onHide, setLoggedIn}) {

    const logout = () => {
        auth.signOut()
        setLoggedIn(false)
        onHide()
    }

    return (

        <Modal
            show={show}
            onHide={onHide}>
            <div className="m-4 d-flex flex-column justify-content-center">
                <span> Are you sure you want to sign out?</span>
                <Button className="mt-4" variant="danger" onClick={() => {
                    logout()
                }}> Sign Out</Button>
                <Button variant="secondry" onClick={() => {
                    onHide()
                }}>Cancel</Button>
            </div>
        </Modal>

    );

}

export default SignoutModal