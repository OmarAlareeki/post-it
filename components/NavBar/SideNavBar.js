import style from "../../styles/NavBar.module.css";

export const SideNavBar = () => {
  const listings = ["All Posts", "Saved Posts", "My Posts", "Free"];
  const categories = [
    "Appliance",
    "Baby and Kids",
    "Clothing",
    "Electronics",
    "Garden",
    "Home Decore",
    "Tools",
    "Toys and Games",
    "Vehicles",
    "Others",
  ];
  return (
    <div>
      <ul className={style.SideBar}>
        {listings.map((list, i) => (
          <li key={i}> {list} </li>
        ))}

        <li style={{ fontSize: "20px", padding: "10px", fontWeight: "bold" }}>
          Categories:
        </li>
        {categories.map((category, i) => (
          <li key={i}> {category} </li>
        ))}
      </ul>
    </div>
  );
};
