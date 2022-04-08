import React from "react";
import { NavLink } from "react-router-dom";
import s from './styles/LandingPage.module.css';

export default function LandingPage() {
    return (
        <div className={s.divContainer} >
        <h1 className={s.title}>Welcome to the Food App Henry!</h1>
        <NavLink to={'/home'}>
            <button className={s.start}>Start</button>
        </NavLink>

        </div>
    );
};