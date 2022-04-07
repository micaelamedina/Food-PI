import React from "react";
import { NavLink } from "react-router-dom";
import s from './styles/Recipe.module.css';

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
            <div className={s.divGeneral}>
            <NavLink to={`/recipe/${id}`}><h3 className={s.name} >Name: {name}</h3></NavLink>
            <img src={image} alt="Img Recipe" />
            <h5 className={s.diets}>Diets:</h5>
            <ul>
            {
                dietFilter?dietFilter.map(e=>{
                    return(
                        <li className={s.li} key={Math.random(id)}>{e}</li>
                    )
                }):dietFilter.length?<p>Loading recipes...</p>:<p>This recipe does not belong to a specific diet.</p>
            }
            </ul>
            </div>
            
        </>
    )
}
// image? image : 'url'
