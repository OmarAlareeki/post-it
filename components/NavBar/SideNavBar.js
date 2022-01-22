import style from "../../styles/NavBar.module.css";

const SideNavBar = ({ setQueryCriteria, setDeleteBtnStatus }) => {
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
      <ul className={style.SideBar}>
        <li
          onClick={() => {
            setQueryCriteria({});
            setDeleteBtnStatus(false);
          }}
        >
          All Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ saved: "7hqkVuE26F2qZx6noZhB" });
            setDeleteBtnStatus(false);
          }}
        >
          Saved Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ userID: "uH9b7YXgqPauH7Lq6tTdWSCWEnw2" });
            setDeleteBtnStatus(true);
          }}
        >
          My Posts
        </li>

        <li
          onClick={() => {
            setQueryCriteria({ price: "0" });
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
