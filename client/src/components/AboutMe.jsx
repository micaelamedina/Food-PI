import React from "react";
import { NavLink } from "react-router-dom";

export default function AboutMe() {
    return(
        <>
            <h2>About Me.</h2>

            <h3>Ir a</h3>
            <ul>
                    <li><NavLink to={'/'} style={{ textDecoration: 'none' }}>Inicio</NavLink></li>
                    <li><NavLink to={'/home'} style={{ textDecoration: 'none' }}>Home</NavLink></li>
                    <li><NavLink to={'/recipes/create'} style={{ textDecoration: 'none' }}>Create Recipe</NavLink></li>
            </ul>
        </>
    )
}