import React from "react";


export default function DaysAgo({ post }) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(post.postDate.seconds * 1000);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    if (diffDays ===0) {
        return "Posted today"
    } 
    if (diffDays ===1) {
        return "Posted 1 day ago"
    } 
    return `Posted ${diffDays} days ago`
}

export function formatDay(seconds) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date();
    const secondDate = new Date(seconds * 1000);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));

    if (diffDays ===0) {
        const oneHour = 60 * 60 * 1000; // minutes*seconds*milliseconds
        const diffHours = Math.round(Math.abs((firstDate - secondDate) / oneHour));
        if (diffHours ===0) {
            const oneMin = 60 * 1000; // minutes*seconds*milliseconds
            const diffMin = Math.round(Math.abs((firstDate - secondDate) / oneMin));
            return `${diffMin} min ago`
        } 
        return `${diffHours} hours ago`
    } 
    if (diffDays ===1) {
        return "1 day ago"
    } 
    return `${diffDays} days ago`
}