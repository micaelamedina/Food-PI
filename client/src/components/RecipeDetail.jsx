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
                     : <h3>Loading recipe...</h3>
            }
        </>
    );
};

