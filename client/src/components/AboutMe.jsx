import React from "react";
import { NavLink } from "react-router-dom";

export default function AboutMe() {
    return(
        <>
            <h2>About Me.</h2>

            <h3>Ir a</h3>
            <ul>
                    <li><NavLink to={'/'}>Inicio</NavLink></li>
                    <li><NavLink to={'/home'}>Home</NavLink></li>
                    <li><NavLink to={'/recipes/create'}>Create Recipe</NavLink></li>
            </ul>
        </>
    )
}