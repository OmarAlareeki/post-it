import style from "../../styles/NavBar.module.css";
import { useState } from "react";
import { IoFilterOutline } from "react-icons/io";

const SideNavBar = ({ setQueryCriteria, setDeleteBtnStatus, currUser }) => {
  const [clickStatus, setclcikStatus] = useState(false);

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

  let bgColor;

  // function handleColor() {
  //   clickStatus ? bgColor === "orange" : "transparent";
  //   setclcikStatus(false);
  // }

  return (
    <div>
      <>
        <IoFilterOutline />
      </>
      <ul className={style.SideBar}>
        <li
          className={`${bgColor === "orange" && clickStatus ? "active" : ""}`}
          onClick={() => {
            setQueryCriteria({});
            setDeleteBtnStatus(false);
            setclcikStatus(true);
          }}
        >
          All Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ saved: currUser.uid });
            currUser.uid === undefined
              ? alert("You Don't have any Saved Posts or You are not Logged-In")
              : "";
            setDeleteBtnStatus(false);
          }}
        >
          Saved Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ userID: currUser.uid });
            currUser.uid ? setDeleteBtnStatus(true) : setDeleteBtnStatus(false);
            currUser.uid === undefined
              ? alert("You have not created any Posts or You are not Logged-In")
              : "";
          }}
        >
          My Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ price: 1 });
            setDeleteBtnStatus(false);
          }}
        >
          Free
        </li>

        <li className={style.CategoryList}> Categories: </li>

        {[...categories.keys()].map((categoryName, i) => (
          <li
            key={i}
            onClick={() => {
              setQueryCriteria({ category: categories.get(categoryName) });
              setDeleteBtnStatus(false);
            }}
          >
            {categoryName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideNavBar;
