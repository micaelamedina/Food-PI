import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function NavBar() {
    return(
        <>
            <div>
                <NavLink to={'/'}><button>Go to Inicio</button></NavLink>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div>
                <NavLink to={'/recipes/create'}><button>Create New Recipe</button></NavLink>
            </div> 
        </>
    );
};