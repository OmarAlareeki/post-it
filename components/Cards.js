import React, {useState, useEffect} from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/fire-config";

const Cards = ({ props, deleteBtnStatus }) => {

  const [isMobile, setIsMobile] = useState(window.innerWidth < 480);

  useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 480;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
}, [isMobile]);

  return (
    <Container className={style.PostsDisplay}>
      {props.map((prop) => (
        <div key={prop.id}>
          <Card className={style.Cards}>
            <Card.Link
              href={`/displaypage/${prop.id}`}
              style={{
                color: "black",
                textDecoration: "none",
              }}
            >
              <Card.Img
                src={prop.imageUrls}
                alt={prop.title}
                className={style.CardImage}
              />
              <Card.Body>
                <Card.Title
                className="h6"
                  style={{
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                    textDecoration: "none",
                  }}
                >
                  {prop.title}
                </Card.Title>
                <Card.Text>$ {prop.price}</Card.Text>
                <Card.Text >
                 Posted {Math.floor(((timeNow - prop.postDate.toDate())/3600000))<24?(
                   `${Math.floor((timeNow - prop.postDate.toDate())/3600000)} hours`)
                  : Math.floor(((timeNow - prop.postDate.toDate())/3600000)/24)>1? 
                    `${Math.floor(((timeNow - prop.postDate.toDate())/3600000)/24)} days`:
                    `${Math.floor(((timeNow - prop.postDate.toDate())/3600000)/24)} day`} ago
                     
                </Card.Text>
              </Card.Body>
            </Card.Link>
          </Card>
          <button
            onClick={async () => {
              await deleteDoc(doc(db, "posts", prop.id));
            }}
            style={{
              display: deleteBtnStatus ? "block" : "none",
            }}
            className={`${!isMobile ? style.DeleteButton : style.DeleteButtonMobile}`}
          >
            <RiDeleteBin6Line />
          </button>
        </div>
      ))}
    </Container>
  );
};
export default Cards;
