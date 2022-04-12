import React from "react";
import { NavLink } from "react-router-dom";

export default function ErrorPage() {
    return(
        <>
            <h2>Oops!... I Did It Again! This page do not exist</h2>
            <div>
                <h4>Quizás querias ir a...</h4>
                <ul>
                    <li><NavLink to={'/'} style={{ textDecoration: 'none' }}>Inicio</NavLink></li>
                    <li><NavLink to={'/home'} style={{ textDecoration: 'none' }}>Home</NavLink></li>
                    <li><NavLink to={'/about'} style={{ textDecoration: 'none' }}>About Me</NavLink></li>
                    <li><NavLink to={'/recipe/create'} style={{ textDecoration: 'none' }}>Create Recipe</NavLink></li>
                </ul>
            </div>
        </>
    )
}