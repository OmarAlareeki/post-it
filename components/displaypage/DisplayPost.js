import React from "react";
import Content from "./Content";
// import Map from "./Map";
import PhotoGallery from "./PhotoGallery";
import styles from "./DisplayPost.module.css";
import dynamic from 'next/dynamic'

const Map = dynamic(
  () => import('./Map'),
  { ssr: false }
)



export default function DisplayPost({ post }) {
//  return 'check'
    return (
        <div className={styles.mainField}>
            <div className={styles.content}>
                <Content post={post} />
            </div>
            <div className={styles.map}>
                <Map zip={post.zip}/>
            </div>
            <div className={styles.photoGallery}>
                <PhotoGallery photos={post.imageUrls} />
            </div>
        </div>


    )
}



