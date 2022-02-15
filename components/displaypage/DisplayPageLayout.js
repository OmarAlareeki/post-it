import React from "react";
import NavBar from "../NavBar/NavBar";
import SideNavBar from "../NavBar/SideNavBar";
import styles from "./DisplayPageLayout.module.css";
import homeStyle from "../../styles/Home.module.css";

export default function DisplayPageLayout({ children }) {
  return (
    <main>
      <NavBar />
      <div className={homeStyle.mainContainer}>
        {/* <div>
            <SideNavBar />
            </div> */}
        <div className={styles.contentContainer}>{children}</div>
      </div>
    </main>
  );
}
