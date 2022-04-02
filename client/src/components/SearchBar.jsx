import React from "react";
import { useState } from "react";

export default function SearchBar() {
    const [input, setInput] = useState( {
        search: '',
    });
    const handleChange = (event) => {
        event.preventDefault();
        setInput((prev) => ({...prev, [event.target.name]: event.target.value}));
    };
    const handleSubmit = (event) => {
        setInput({search: ''})
    };
    return(
        <>
            <div>
                <label>Search Recipe</label>
                <input type="text" placeholder="Recipe Name" name={"search"} value={input.search} onChange={e=>handleChange(e)}/>
                <button onClick={e=>handleSubmit(e)}>Search</button>
            </div>
        </>
    );
};