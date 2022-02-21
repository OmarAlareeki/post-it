import React, { useState } from "react";
import { Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import style from "../styles/Home.module.css";
import { formatDay } from "./DaysAgo";
import DeletePost from "./DeletePosts";
import ZipToCity from "./ZipToCity";
const CardsContainer = ({
  posts,
  deleteBtnStatus,
  setConfirmationMessage,
  handleClick,
}) => {
  return (
    <div>
      <Container className={style.PostsDisplay}>
        {posts.map((post) => (
          <div key={post.id}>
            <Card className={style.Cards}>
              <Card.Link
                href={`/displaypage/${post.id}`}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <Card.Img
                  variant="top"
                  src={post.imageUrls}
                  alt={post.title}
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
                    {post.title}
                  </Card.Title>
                  <Card.Text>$ {post.price}</Card.Text>
                  <Card.Text>
                    <ZipToCity zip={post.zip} />
                  </Card.Text>
                  <Card.Text className={style.timeAgo}>
                    {formatDay(post.postDate.seconds)}
                  </Card.Text>
                </Card.Body>
              </Card.Link>
            </Card>
            <>
              <DeletePost
                handleClick={handleClick}
                setConfirmationMessage={setConfirmationMessage}
                pid={post.id}
                title={post.title}
                deleteBtnStatus={deleteBtnStatus}
              />
            </>
          </div>
        ))}
      </Container>
    </div>
  );
};
export default CardsContainer;
