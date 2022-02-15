import React from "react";
import styles from "./PhotoGallery.module.css";
import { Carousel } from "react-bootstrap";
import Head from "next/head";

export default function PhotoGallery({ photos }) {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="sliderStyles" />
      </Head>
      <Carousel className={styles.carousel}>
        {photos.map((photo, i) => (
          <Carousel.Item
            key={i}
            //className={styles.carouselItem}
            className="carousel-item img-fluid"
          >
            <div className={styles.carouselItem}>
              <img src={photos[i]} alt="Slide" />
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
