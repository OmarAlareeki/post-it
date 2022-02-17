import style from "../../styles/NavBar.module.css";
import { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import Router from "next/router";
import { PropTypes } from "prop-types";
import { db } from "../../config/fire-config";
import {
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

const SideNavBar = ({
  setPosts,
  sortType,
  sortValue,
  setDeleteBtnStatus,
  currentUserId,
}) => {
  const [clickStatus, setclcikStatus] = useState(false);
  const [liValue, setLiValue] = useState("");
  const [queryCriteria, setQueryCriteria] = useState({});

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

  useEffect(async () => {
    const postsRef = collection(db, "posts");
    let q;

    if (
      !queryCriteria ||
      Object.values(queryCriteria).every((value) => value === undefined) ||
      queryCriteria.category ||
      queryCriteria.price ||
      queryCriteria.userID
    ) {
      if (
        !queryCriteria ||
        Object.values(queryCriteria).every((value) => value === undefined)
      ) {
        q = query(postsRef, orderBy(sortValue, sortType));
      } else if (queryCriteria.category) {
        q = query(
          postsRef,
          orderBy(sortValue, sortType),
          where("category", "==", queryCriteria.category)
        );
      } else if (queryCriteria.price) {
        if (sortValue === "price" && (sortType === "asc" || "desc")) {
          sortValue = "postDate";
          sortType = "desc";
        }
        q = query(
          postsRef,
          orderBy("price", "desc"),
          orderBy(sortValue, sortType),
          where("price", "<", queryCriteria.price)
        );
      } else if (queryCriteria.userID) {
        q = query(
          postsRef,
          orderBy(sortValue, sortType),
          where("userId", "==", queryCriteria.userID)
        );
      }
      onSnapshot(q, (snap) => {
        const queryList = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPosts(queryList);
      });
    } else if (queryCriteria.saved) {
      const docRef = doc(db, "users", currentUserId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().savedPosts) {
          const savedArray = docSnap
            .data()
            .savedPosts.map((arr) => ({ id: arr.postId, ...arr }));
          setPosts(savedArray);
        } else {
          setPosts([]);
        }
      } else {
        Router.push("/signIn/SignIn");
      }
    }
  }, [queryCriteria, sortValue, sortType]);

  return (
    <div>
      <span className={style.Menu}>
        <MdFilterList className={style.FilterIcon} />
        <ul className={style.SideBar}>
          <li
            className={
              clickStatus && liValue === "AllPosts" ? style.Active : ""
            }
            onClick={() => {
              setQueryCriteria({});
              setDeleteBtnStatus(false);
              setclcikStatus(true);
              setLiValue("AllPosts");
            }}
          >
            All Posts
          </li>

          <li
            className={
              clickStatus && liValue === "SavedPosts" ? style.Active : ""
            }
            onClick={() => {
              setQueryCriteria({ saved: currentUserId });
              currentUserId === undefined ? Router.push("/signIn/SignIn") : "";
              setDeleteBtnStatus(false);
              setclcikStatus(true);
              setLiValue("SavedPosts");
            }}
          >
            Saved Posts
          </li>

          <li
            className={clickStatus && liValue === "MyPosts" ? style.Active : ""}
            onClick={() => {
              setLiValue("MyPosts");
              setclcikStatus(true);
              setQueryCriteria({ userID: currentUserId });
              currentUserId
                ? setDeleteBtnStatus(true)
                : setDeleteBtnStatus(false);
              currentUserId === undefined ? Router.push("/signIn/SignIn") : "";
            }}
          >
            My Posts
          </li>

          <li
            className={clickStatus && liValue === "Free" ? style.Active : ""}
            onClick={() => {
              setQueryCriteria({ price: 1 });
              setDeleteBtnStatus(false);
              setclcikStatus(true);
              setLiValue("Free");
            }}
          >
            Free
          </li>

          <li className={style.CategoryList}> Categories: </li>

          {[...categories.keys()].map((categoryName, i) => (
            <li
              className={
                clickStatus && liValue === categoryName ? style.Active : ""
              }
              key={i}
              onClick={() => {
                setQueryCriteria({ category: categories.get(categoryName) });
                setDeleteBtnStatus(false);
                setLiValue(categoryName);
                setclcikStatus(true);
              }}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </span>
    </div>
  );
};

SideNavBar.propTypes = {
  setQueryCriteria: PropTypes.func,
  setDeleteBtnStatus: PropTypes.func,
  currentUserId: PropTypes.string,
};

export default SideNavBar;
