import style from "../../styles/NavBar.module.css";
import { useState } from "react";

const SideNavBar = ({ setQueryCriteria }) => {
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

        <li>Saved Posts</li>
        <li>My Posts</li>

        <li onClick={handleClick({ price: "free" })}>Free</li>

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
