import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeByName } from "../redux/actions";

export default function SearchBar() {
    const dispatch = useDispatch();
    const [input, setInput] = useState('');

    const handleChange = (event) => {
        event.preventDefault();
        setInput(event.target.value);
    };
    const handleSubmit = (event) => {
        
        event.preventDefault();
        dispatch(getRecipeByName(input));
        setInput('');
    };
    return(
        <>
            <div>
                <label>Search Recipe</label>
                <input type="text" placeholder="Recipe Name" onChange={e=>handleChange(e)}/>
                <button onClick={e=>handleSubmit(e)}>Search</button>
            </div>
        </>
    );
};