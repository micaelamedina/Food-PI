import { useState, useEffect } from "react";
import {useSelector, useDispatch }from 'react-redux';
import NavBar from "./NavBar";
import { getAllRecipes } from "../redux/actions";
import { Recipe } from "./Recipe";

export default function Home() {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);

    console.log(allRecipes);

    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch]);

    const handleEventClick = (event) => {
        event.preventDefault();
        dispatch(getAllRecipes());
    };
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <button onClick={e=>handleEventClick(e)}>Reload</button>
            </div>
            <select>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select>
                <option value='scoreAsc'>Score Ascendente</option>
                <option value='scoreDesc'>Score Descendente</option>
            </select>
            <select>
                <option value='paleolithic'>Paleolithic</option>
                <option value='dairy free'>Dairy free</option>
                <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                <option value='vegan'>Vegan</option>
                <option value='gluten free'>Gluten free</option>
                <option value='primal'>Primal</option>
                <option value='pescatarian'>Pescatarian</option>
                <option value='fodmap friendly'>Fodmap friendly</option>
                <option value='whole 30'>Whole 30</option>
                <option value='ketogenic'>Ketogenic</option>
                <option value='vegetarian'>Vegetarian</option>
            </select>
            <br/>
            {<div>
                    {allRecipes && allRecipes.map((recipe) => {
                        return (
                            <>
                            <Recipe 
                            name={recipe.name}
                            diets={recipe.diets.map(r=>r)}
                            image={recipe.image}
                            id={recipe.id}
                            key={recipe.id}
                            />
                            </>)
                    }
                    )}
            </div>};
        </div>
    )
}