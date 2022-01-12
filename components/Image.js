// import { useState } from "react";
// import storage from "./firebase";

// function App() {
//   const [image, setImage] = useState("");
//   const [Url, setUrl] = useState("");

//   const upload = () => {
//     if (image == null) return;
//     setUrl("Getting Download Link...");

//     // Sending File to Firebase Storage
//     storage
//       .ref(`/images/${image.name}`)
//       .put(image)
//       .on("state_changed", alert("success"), alert, () => {
//         // Getting Download Link
//         storage
//           .ref("images")
//           .child(image.name)
//           .getDownloadURL()
//           .then((url) => {
//             setUrl(url);
//           });
//       });
//   };

//   return (
//     <div className="App" style={{ marginTop: 250 }}>
//       <center>
//         <input
//           type="file"
//           onChange={(e) => {
//             setImage(e.target.files[0]);
//           }}
//         />
//         <button onClick={upload}>Upload</button>
//         <br />
//         <p>
//           <a href={Url}>{Url}</a>
//         </p>
//       </center>
//     </div>
//   );
// }

// export default App;
