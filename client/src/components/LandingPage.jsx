import React from "react";
import { NavLink } from "react-router-dom";

export default function LandingPage() {
    return (
        <>
        <div>
        <h1>Welcome to the Food App Henry!</h1>
        <NavLink to={'/home'}>
            <button>Start</button>
        </NavLink>
        </div>
        </>
    );
};