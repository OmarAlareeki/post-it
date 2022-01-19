import style from "../../styles/NavBar.module.css";
import { db, auth } from "../../config/fire-config";
import { useState, useEffect } from "react";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";

const SideNavBar = ({ setQueryCriteria }) => {
  //const [currUser, setCurrUser] = useState("kTQWkCB3I9Qs7kQpHyKmDM6N8EY2");
  const [savedPosts, setSavedPosts] = useState([]);

  const categories = new Map([
    ["Appliance", "appliance"],
    ["Baby and Kids", "babyAndKids"],
    ["Clothing", "clothing"],
    ["Electronics", "electronics"],
    ["Furniture", "furniture"],
    ["Garden", "garden"],
    ["Home Decor", "homeDecor"],
    ["Tools", "tools"],
    ["Toys and Games", "toysAndGames"],
    ["Vehicles", "vehicles"],
    ["Others", "others"],
  ]);

  // onAuthStateChanged(auth, (user) =>
  //   user ? setCurrUser(user) : setCurrUser("")
  // );

  useEffect(async () => {
    const userRef = doc(db, "users", "7hqkVuE26F2qZx6noZhB");
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const savedArray = docSnap.data().savedPosts;
      console.log("**data: " + JSON.stringify(docSnap.data().savedPosts));
      setSavedPosts(savedArray);
    } else {
      //   // doc.data() will be undefined in this case
      setSavedPosts("No such document!");
      return;
    }
  }, []);

  const handleClick = (newQueryCriteria) => {
    return () => {
      setQueryCriteria(newQueryCriteria);
      console.log("ListName:  " + newQueryCriteria);
    };
  };

  return (
    <div>
      <ul className={style.SideBar}>
        <li onClick={handleClick({})}>All Posts</li>

        <li onClick={handleClick({ saved: savedPosts })}>Saved Posts</li>

        <li onClick={handleClick({ userID: "kTQWkCB3I9Qs7kQpHyKmDM6N8EY2" })}>
          My Posts
        </li>

        <li onClick={handleClick({ price: "0" })}>Free</li>

        <li className={style.CategoryList}>Categories:</li>

        {[...categories.keys()].map((categoryName, i) => (
          <li
            key={i}
            onClick={handleClick({ category: categories.get(categoryName) })}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavBar;
