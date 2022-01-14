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
<<<<<<< HEAD
        <li value="All Posts"> All Posts </li>
        <li value="Saved Posts"> Saved Posts</li>
        <li value="My Posts"> My Posts </li>
        <li value="Free"> Free </li>
        <li style={{ fontSize: "20px", paddingTop:"10px", paddingBottom: "10px", fontWeight: "bold" }}>
=======
        {listings.map((list, i) => (
          <li key={i}> {list} </li>
        ))}

        <li style={{ fontSize: "20px", padding: "10px", fontWeight: "bold" }}>
>>>>>>> f59c940aac843bdd09bd1f2e5ca8861bfc67b2ad
          Categories:
        </li>
        {categories.map((category, i) => (
          <li key={i}> {category} </li>
        ))}
      </ul>
    </div>
  );
};
