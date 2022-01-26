import React from "react";
import Content from "./Content";
import PhotoGallery from "./PhotoGallery";
import styles from "./DisplayPost.module.css";
import dynamic from 'next/dynamic';
import { Container, Button } from "react-bootstrap"
import Router from "next/router"
const Map = dynamic(
    () => import('./Map'),
    { ssr: false }
)

export default function DisplayPost({ post }) {
    return (
        <Container>
            <Button onClick={() => {
                Router.push('/')
            }}>Go Back</Button>
            <div className={styles.mainField}>
                <div className={styles.content}>
                    <Content post={post} />
                </div>
                <div className={styles.map}>
                    <Map zip={post.zip} title={post.title} price={post.price} />
                </div>
                <div className={styles.photoGallery}>
                    <PhotoGallery photos={post.imageUrls} />
                </div>
            </div>
        </Container>
    )
}



