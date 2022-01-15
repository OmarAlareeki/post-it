import React, { useState, useEffect } from "react";
import { doc, onSnapshot, collection, getDoc} from "firebase/firestore";
import useSWR, {mutate} from 'swr';
import Content from "../components/Content";
import Map from "../components/Map";
import PhotoGallery from "../components/PhotoGallery";
import { db, storage } from "../config/fire-config";


//нужны ли эти 3 импорта?
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';




//fetcher here is an async function that accepts the key of SWR, and returns the data.
//The returned value will be passed as data, and if it throws, it will be caught as error.
// document for test ETz2WkKrFl04CjezSxH8 in postsNatalia

// const fetcher = (postId) => (
//     fire.firestore()
//         .collection('postsNatalia')
//         .onSnapshot(snap => {
//             const postDetails = snap.docs.find(post => post.id === ETz2WkKrFl04CjezSxH8);
//             console.log(postDetails);
//         })
// )

//get raw collection with a lot of extra data
onSnapshot (collection(db, 'postsNatalia'), (snapshot) => (
    console.log(snapshot.docs)
));

//get array of data from postsNatalia collection
onSnapshot (collection(db, 'postsNatalia'), (snapshot) => (
    console.log(snapshot.docs.map(doc => doc.data()))
));

//get array of id's of docs in postsNatalia collection
onSnapshot (collection(db, 'postsNatalia'), (snapshot) => (
    console.log(snapshot.docs.map(doc => doc.id))
));

//get array of documents, which will include ID
onSnapshot (collection(db, 'postsNatalia'), (snapshot) => (
    console.log(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})))
));

//get array of documents, which will include ID, but need to be passed outside function by useState
onSnapshot (collection(db, 'postsNatalia'), (snapshot) => {
    
    const allPosts = [...snapshot.docs.map(doc => ({...doc.data(), id: doc.id}))]
    return allPosts
});


// const docRef = doc(db, "postsNatalia", 'ETz2WkKrFl04CjezSxH8');
// // to subscribe to any updates of this document we fire onSnapshot function, to get updates as soon as they happen. onSnapshot - real time listener
// onSnapshot(docRef, (doc) => {
//     console.log({fromSnapshot: doc.data(), fromSnapshot2: doc.id})
// })

// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }




export default function displayPost ({details}) {

const [postToDisplay, setPosttoDisplay] = useState([]);

console.log({postToDisplay});
 useEffect( ( () => {
 const docRef = doc(db, "postsNatalia", 'ETz2WkKrFl04CjezSxH8');
    return (onSnapshot(docRef, (doc) => {
     const post = {...doc.data(), id: doc.id};
     console.log({post});
     setPosttoDisplay(post);
    }))}
), []) 


    //  useEffect( ( () => {
    //     const docRef = doc(db, "postsNatalia", 'ETz2WkKrFl04CjezSxH8');
    //        onSnapshot(docRef, (doc) => {
    //         const post = {...doc.data(), id: doc.id};
    //         console.log({post});
    //         setPosttoDisplay(post);
// })}
// ), []) 

// const postToDisplay1 = postToDisplay;
// delete postToDisplay1.imageUrls;
// delete postToDisplay1.images;
// delete postToDisplay1.postDate;
//  const postArray = Object.values(postToDisplay1);
//  console.log(postArray);

 
    // const { data, error } = useSWR('/api/user', fetcher)

    // if (error) return <div>failed to load</div>
    // if (!data) return <div>loading...</div>
    // return <div>hello {data.name}!</div>
    // console.log(postToDisplay.imageUrls);

return (
    <div>
        <h1>I am displayPost page</h1>
        <ul> 
            {/* {postArray.map((post,i) =>
            <li key={i}>{post}</li>)} */}
        </ul>
        <Content />
        <Map />
        <PhotoGallery photos={postToDisplay.imageUrls} />
    </div>
)
}