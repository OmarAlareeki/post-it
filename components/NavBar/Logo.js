import React from "react";
import style from "../../styles/NavBar.module.css";
import {useRouter} from "next/router";

const Logo = () => {
  const router = useRouter();
  return (
    <>
      <img
        src="../Logo3.png"
        className={style.Logo}
        onClick={() => {
          router.push("/");
        }}
      />
    </>
  );
};

export default Logo;
