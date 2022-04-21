import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName, setCurrentPage } from "../redux/actions";
import s from "./styles/SearchBar.module.css";
import n from "./styles/NavBar.module.css";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(setCurrentPage(1));
        dispatch(getRecipeByName(search));
        setSearch("");
    };
    return(
        <>
            <header className={s.divCont}>
                
                <div className={s.divSearch}>
                <form>
                <input className={s.inputClass} value={search} name={search} type={"search"} autoComplete="off" placeholder="Insert Recipe Name" onChange={e=>handleChange(e)}/>
                <button className={n.buttonNav}  onClick={e=>handleSubmit(e)}>Search</button>
                </form>
                
                </div>
            </header>
        </>
    );
};