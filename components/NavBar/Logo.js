import React from "react";
import style from "../../styles/NavBar.module.css";
import Router from "next/router";

const Logo = () => {
  return (
    <>
      <img
        src="../Logo3.png"
        className={style.Logo}
        onClick={() => {
          Router.push("/");
        }}
      />
    </>
  );
};

export default Logo;
