import style from "../../styles/NavBar.module.css";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import Router from "next/router";
import { PropTypes } from "prop-types";

const SideNavBar = ({ setQueryCriteria, setDeleteBtnStatus, currUser }) => {
  const [clickStatus, setclcikStatus] = useState(false);
  const [liValue, setLiValue] = useState("");

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
              setQueryCriteria({ saved: currUser.uid });
              currUser.uid === undefined ? Router.push("/signIn/SignIn") : "";
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
              setQueryCriteria({ userID: currUser.uid });
              currUser.uid
                ? setDeleteBtnStatus(true)
                : setDeleteBtnStatus(false);
              currUser.uid === undefined ? Router.push("/signIn/SignIn") : "";
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
  currUser: PropTypes.string,
};

export default SideNavBar;
