import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setSearch(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(getRecipeByName(search));
        setSearch("");
    };
    return(
        <>
            <div>
                <label>Search Recipe</label>
                <input value={search} name={search} type={"search"} autoCapitalize="off" autoComplete="off" placeholder="Recipe Name" onChange={e=>handleChange(e)}/>
                <button onClick={e=>handleSubmit(e)}>Search</button>
            </div>
        </>
    );
};