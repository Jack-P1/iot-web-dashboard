import { AuthContext } from "./Auth";
import React, {useContext, useEffect, useState} from "react";
import { Link } from "react-router-dom";

function Navbar(){
    const {user, token} = useContext(AuthContext);
    if(!token || !user) return null;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-success">
            <a className="navbar-brand" href="#">{user.name} <br /> {user.role}</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to={`/home`}>Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/home`}>Branches</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/home`}>Profile</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to={`/home`}>Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;