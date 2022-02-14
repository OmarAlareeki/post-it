import React from "react";
import NavBar from "../NavBar/NavBar";
import SideNavBar from "../NavBar/SideNavBar";
import styles from "./DisplayPageLayout.module.css";

export default function DisplayPageLayout ({children}) {

    return (
    <div className="container">
        <div><NavBar /></div>
        <div className="d-flex">
            <div className={styles.sideBar}>
            <SideNavBar />
            </div>
            <div style={{flex:1}}>{children}</div>
            
        </div>
    </div>    
    )
}