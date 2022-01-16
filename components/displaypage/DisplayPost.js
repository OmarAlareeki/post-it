import React from "react";
import Content from "./Content";
import Map from "./Map";
import PhotoGallery from "./PhotoGallery";


export default function DisplayPost({ post }) {
//  return 'check'
    return (
        <div>
            <div>
                <Content />
            </div>
            {/* <div>
                <Map />
            </div> */}
            <div>
                <PhotoGallery photos={post.imageUrls} />
            </div>
        </div>


    )
}



