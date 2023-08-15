import React from "react";
import { NavLink } from "react-router-dom";
import "./header.css";
import logo from "../logo/logo.jpg"

const Header = () => {
    return (
        <>
            <div className="header">
                <div className="hederimg">

                    <img src={logo} className="img" />

                </div>
                <div className="headerlink">
                    <ul className="headerlist">
                        <li><NavLink to={"/"} >Webseries</NavLink></li>
                        <li><NavLink to={"/dashboardtable"} >Webseries Table</NavLink></li>
                        <li><NavLink to={"/websriessearch"} >Webseries Search</NavLink></li>
                        <li><NavLink to={"/comment"} >Comment</NavLink></li>
                    </ul>
                </div>




            </div>









        </>
    )
}
export default Header;