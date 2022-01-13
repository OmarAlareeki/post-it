import style from "../../styles/NavBar.module.css";

export const SideNavBar = () => {
  return (
    <div>
      <ul className={style.SideBar}>
        <li value="All Posts"> All Posts </li>
        <li value="Saved Posts"> Saved Posts</li>
        <li value="My Posts"> My Posts </li>
        <li value="Free"> Free </li>
        <li style={{ fontSize: "20px", paddingTop:"10px", paddingBottom: "10px", fontWeight: "bold" }}>
          Categories:
        </li>
        <li value="appliance"> Appliance </li>
        <li value="babyAndKids">Baby and Kids</li>
        <li value="clothing"> Clothing </li>
        <li value="electronics"> Electronics</li>
        <li value="furniture"> Furniture </li>
        <li value="garden"> Garden </li>
        <li value="homeDecor"> Home Decor </li>
        <li value="tools"> Tools </li>
        <li value="toysAndGames"> Toys and Games </li>
        <li value="vehicles"> Vehicles </li>
        <li value="others"> Others </li>
      </ul>
    </div>
  );
};
