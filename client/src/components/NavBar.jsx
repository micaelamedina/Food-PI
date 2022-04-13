import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";
import s from "./styles/NavBar.module.css";

export default function NavBar() {


    return(
        <>
        <nav className={s.principalDiv}>
            <ul className={s.navbar}>
                <li className={s.inicioClass}>
                <NavLink to={'/'} style={{ textDecoration: 'none' }}><button className={s.buttonNav}>Restart</button></NavLink>
                </li>
                <li><SearchBar/></li>
                <li className={s.create}>
                <NavLink to={'/recipes/create'} style={{ textDecoration: 'none' }}><button className={s.buttonNav}>Create New Recipe</button></NavLink>
                </li>
            </ul>
            </nav>
        </>
    );
};
