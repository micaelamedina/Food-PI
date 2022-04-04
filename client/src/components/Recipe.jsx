import React from "react";
import { NavLink } from "react-router-dom";

const detectDiet = function(diets) {
    if(diets){
        if(typeof diets[0] === 'string') {
            return diets;
        } else {
            let dietFilter = diets.map((d)=>d.name);
            return dietFilter;
        };
    };
};

const dietsToUpperCase = (dietsArray) => {
    let newArrayDiets = dietsArray.map(d=> {
        return d[0].toUpperCase() + d.slice(1);
    })
    return newArrayDiets;
}
export function Recipe({id, name, diets, image}){
    var dietFilter = detectDiet(diets);
    dietFilter = dietsToUpperCase(dietFilter);
    return(
        <>
            <NavLink to={`/recipe/${id}`}><h3>Name: {name}</h3></NavLink>
            <h5>Diets:</h5>
            <ul>
            {
                dietFilter?dietFilter.map(e=>{
                    return(
                        <li>{e}</li>
                    )
                }):'This recipe does not belong to a specific diet.'
            }
            </ul>
            <img src={image} alt="Img Recipe" />
        </>
    )
}
