import React from 'react'
import style from "../../styles/NavBar.module.css";
import { Container } from 'react-bootstrap'

const Logo = props => {
    return (
        <Container>
        <img
          src="../Logo3.png"
          className={style.Logo}
          onClick={() => {
            Router.push("/");
          }}
        />
      </Container>
    )
}

export default Logo
