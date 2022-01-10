import { useState, useEffect } from "react";
import { db } from "../config/fire-config";
import Head from "next/head";
import Style from "../styles/Home.module.css";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import PostsListContainer from "../components/PostsListContainer";
import NavBar from "../components/NavBar/NavBar";

const Home = () => {
  return (<NavBar />), (<PostsListContainer />);
};
export default Home;
