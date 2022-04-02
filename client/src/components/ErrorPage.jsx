import React from "react";
import { NavLink } from "react-router-dom";
import ReactPlayer from 'react-player';

export default function ErrorPage() {
    return(
        <>
            <h2>Oops!... I Did It Again! This page do not exist</h2>
            <div>
            <ReactPlayer url='https://www.youtube.com/watch?v=CduA0TULnow' controls playing loop />
            </div>
            <div>
                <h4>Quizás querias ir a...</h4>
                <ul>
                    <li><NavLink to={'/'}>Inicio</NavLink></li>
                    <li><NavLink to={'/home'}>Home</NavLink></li>
                    <li><NavLink to={'/about'}>About Me</NavLink></li>
                    <li><NavLink to={'/recipe/create'}>Create Recipe</NavLink></li>
                </ul>
            </div>
        </>
    )
}