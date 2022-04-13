import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../redux/actions";
import { useParams } from "react-router-dom";
import CardRecipe from './CardRecipe';
import s from "./styles/RecipeDetail.module.css";

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
            <div className={s.cardDiv}>
            {
                recipe.name ? 
                        <div className={s.renderCard}>
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
                     :<div className={s.errorDetail}> <h3 className={s.h3ErrDetail}>Loading recipe...</h3></div> 
            }
            </div>
        </>
    );
};

