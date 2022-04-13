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
    });
    return newArrayDiets;
};

export function Recipe({id, name, diets, image}){
    var dietFilter = detectDiet(diets);
    dietFilter = dietsToUpperCase(dietFilter);
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    var urlExp = new RegExp(expression);
    let imageFilter = urlExp.test(image.toString()) === false || image === "" ? "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg" : image;
    return(
        <>
            <div className={s.divGeneral}>
            <h3 className={s.nameStyle} >{name}</h3>
            <div className={s.divImg}>
            <img className={s.imagenItem} src={imageFilter} alt="Img Recipe" />
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
    );
};