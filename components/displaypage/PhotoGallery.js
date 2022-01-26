import React from "react";
import styles from "./PhotoGallery.module.css";
import { Carousel } from 'react-bootstrap'

export default function PhotoGallery({ photos }) {
   
    // console.log({ photos });
    return (
        <Carousel className={styles.carousel}>
            {photos.map ( (photo, i) => (
                        <Carousel.Item key={i} className={styles.carouselItem} class="carousel-item img-fluid"> 
                        {/* <div className={styles.carouselItem}> */}
                        <img

                            src={photos[i]}
                            alt="Slide"
                    
                        />
                        {/* </div> */}
                        </Carousel.Item>
            ))}
        </Carousel>
    );
}