import React from "react";


export default function DaysAgo({ post }) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(post.postDate.seconds * 1000);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    const showDays ="";
    // if (diffDays === 0) {
    //     const showDays = "Posted today"
    //     console.log({showDays})
    // }
    // else {const showDays = "Posted earlier"}  
    // // console.log({diffDays})
    // console.log({ showDays })
    return `Posted ${diffDays} days ago`
    //  <>
    //  {diffDays===0 ? "Posted today" : "Posted earlier"}
    //  </>
    // <>showDays</>

}