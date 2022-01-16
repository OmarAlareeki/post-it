import React from "react";

export default function DisplayPageLayout ({children}) {

    return (
    <div className="container">
        <div>NavBar</div>
        <div className="d-flex">
            <div>SideBar</div>
            <div>{children}</div>
            
        </div>
    </div>    
    )
}