import React from "react";
import NavBar from "../NavBar/NavBar";
import styles from "./DisplayPageLayout.module.css";

export default function DisplayPageLayout ({children}) {

    return (
    <div className="container">
        <div><NavBar /></div>
        <div className="d-flex">
            <div className={styles.sideBar}>SideBar</div>
            <div style={{flex:1}}>{children}</div>
            
        </div>
    </div>    
    )
}