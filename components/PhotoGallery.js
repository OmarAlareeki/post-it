import React from "react";
import styles from "./PhotoGallery.module.css";

export default function PhotoGallery ({photos}) {
// for testing doll's url in FB https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/imagesNatalia%2F1641946321560.jpg?alt=media&token=17c803ac-7a22-44a6-9485-bec4f2f34c9a
console.log({photos})    
return (
    <>
        <h1>I am PhotoGallery componet</h1>
        {/* <img 
      src="https://firebasestorage.googleapis.com/v0/b/journeymanapp-17b05.appspot.com/o/imagesNatalia%2F1641946321560.jpg?alt=media&token=17c803ac-7a22-44a6-9485-bec4f2f34c9a"
      alt="new"
        /> */}
        <div> 
            {photos.map((photo,i) =>
            <img className={styles.photo} key={i} src={photo} />)}
        </div>
    </>    
    )
}