import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import { useParams } from "react-router-dom";
import CardRecipe from './CardRecipe';
import NavBar from "./NavBar";
import { NavLink } from "react-router-dom";

//diets api: es un array [vegan, ketogenic]
//diets db: array de objetos. [{name: vegan}, {name: ketogenic}]

export default function RecipeDetail() {
    const {idRecipe} = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDetails(idRecipe));
    }, [dispatch, idRecipe]);

    const recipe = useSelector((state) => state.details);
    console.log(recipe)
    return(
        <>
            <div>
                  <NavBar/>
            </div>
            <div>
                <NavLink to={'/home'}><button>Go to home</button></NavLink>
            </div>
            {
                recipe.name ? 
                        <div>
                            <CardRecipe 
                            name={recipe.name}
                            image={recipe.image}
                            diets={recipe.diets}
                            score={recipe.score}
                            healthScore={recipe.healthScore}
                            summary={recipe.summary}
                            steps={recipe.steps}
                            key={recipe.id}
                            />
                        </div>
                     : <h3>No hay recetas con ese nombre</h3>
            }
            {/* <h3>Name: {name}</h3>
            <img src={image} alt="Img Recipe" />
            <h5>Diet: {diets}</h5>
            <h5>Score: {score}</h5>
            <h5>Healty Score: {healthScore}</h5>
            <h5>Summary:</h5>
            <span>{summary}</span>
            <h5>Steps:</h5>
            <span>{steps}</span> */}
        </>
    );
};

