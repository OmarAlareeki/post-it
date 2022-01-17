import React from "react";
import styles from "./PhotoGallery.module.css";
import { Carousel } from 'react-bootstrap'

export default function PhotoGallery({ photos }) {
    // for testing doll's url in FB https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/imagesNatalia%2F1641946321560.jpg?alt=media&token=17c803ac-7a22-44a6-9485-bec4f2f34c9a
    console.log({ photos });
    return (
        <Carousel>
            {photos.map ( (photo, i) => (
                        <Carousel.Item key={i}>
                        <img
                            className="d-block w-100"
                            src={photos[i]}
                            alt="Slide"
                        />
                        </Carousel.Item>
            ))}
        </Carousel>
    );
}