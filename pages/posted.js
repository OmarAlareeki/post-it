import React, { useState } from "react";
import {Button } from 'react-bootstrap'

import Router from "next/router";
import style from "../styles/Home.module.css";


const posted = () => {


  return (
    <dir>
      <p> Item posted</p>
      <Button onClick={()=>{
        Router.push("/")
      }}>Bact to home</Button>
      
    </dir>
  );
};

export default posted;

