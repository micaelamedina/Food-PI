import React from "react";
import { NavLink } from "react-router-dom";
import s from "./styles/ErrorPage.module.css";

export default function ErrorPage() {
    return(
        <>
            <div className={s.errorPage}>
                <h2 className={s.textErrorPage}>Oops! This page do not exist</h2>
                <h4 className={s.textErrorPage}>Maybe you wanted to go to...</h4>
                <ul>
                    <li><NavLink to={'/'} style={{ textDecoration: 'none' }} ><button className={s.buttonErrorPage}>Inicio</button></NavLink></li>
                    <li><NavLink to={'/home'} style={{ textDecoration: 'none' }} ><button className={s.buttonErrorPage}>Home</button></NavLink></li>
                    <li><NavLink to={'/recipes/create'} style={{ textDecoration: 'none' }} ><button className={s.buttonErrorPage}>Create Recipe</button></NavLink></li>
                </ul>
            </div>
        </>
    );
};