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
            <h3 className={s.nameStyle} >{name}</h3>
            <div className={s.divImg}>
            <img className={s.imagenItem} src={image} alt="Img Recipe" />
            </div>
            
            <h3 className={s.diets}>Diets:</h3>
            <ul className={s.ulRecipe}>
            {
                dietFilter?dietFilter.map(e=>{
                    return(
                        <li className={s.liRecipe} key={Math.random(id)}>{e}</li>
                    )
                }):dietFilter.length?<p>Loading recipes...</p>:<p>This recipe does not belong to a specific diet.</p>
            }
            </ul>
            <NavLink to={`/recipe/${id}`} style={{ textDecoration: 'none' }}><button className={s.buttonShow}>Show More Details</button></NavLink>
            </div>
        </>
    )
}
// image? image : 'url'
