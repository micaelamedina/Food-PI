import React, { useEffect, useState } from "react";
import {useSelector, useDispatch }from 'react-redux';
import NavBar from "./NavBar";
import { getAllRecipes, getRecipesByDiet, orderByScore, orderByName } from "../redux/actions";
import { Recipe } from "./Recipe";
import Paginated from "./Paginated";
import { NavLink } from "react-router-dom";

export default function Home(props) {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const recipeFilter = useSelector((state)=>state.recipeFilter);
    const order = useSelector((state)=>state.order)
    const [currentPage, setCurrentPage] = useState(1); //me guarda la pagina actual.
    const [recipesPage] = useState(9); //me guarda la cantidad de recetas por pagina. //ver que no rompa no declarar setRecipesPage, lo saque por el warning.
    const lastRecipe = currentPage * recipesPage; //indice de la ultima receta.
    const firstRecipe = lastRecipe - recipesPage; //indice de la primer receta.
    const recipesCurrent = order === '' ? allRecipes.slice(firstRecipe, lastRecipe) : recipeFilter.slice(firstRecipe, lastRecipe); //corto el array desde el indice de la primer receta hasta el indice de la ultima receta (no la incluye)
    
    const paginado = (numberPage) => {
        setCurrentPage(numberPage);
       // setRecipesPage(9) //ver que esto no rompa nada. es para que no este todo el tiempo haciendo el warning
    };
    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch]);

    const handleEventClick = (event) => {
        event.preventDefault();
        dispatch(getAllRecipes());
    };

    function handleChangeDiet(event){
        event.preventDefault();
        dispatch(getRecipesByDiet(event.target.value));
    };
    function handleChangeScore(event){
        event.preventDefault();
        if(event.target.value !== 'order') {
            dispatch(orderByScore(event.target.value));
        };
    };
    function handleChangeName(event){
        event.preventDefault();
        if(event.target.value !== 'order') {
            dispatch(orderByName(event.target.value));
        };
    };
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <button onClick={e=>handleEventClick(e)}>Reload</button>
            </div>
            <select onClick={e=>handleChangeName(e)}>
                <option value='order'>Order by Name</option>
                <option value='nameAsc'>Ascendente</option>
                <option value='nameDesc'>Descendente</option>
            </select>
            <select onClick={(e)=>handleChangeScore(e)}>
                <option value='order'>Order by Score</option>
                <option value='scoreAsc'>Score Ascendente</option>
                <option value='scoreDesc'>Score Descendente</option>
            </select>
            <select onChange={e=>handleChangeDiet(e)}>
                <option value='all diets'>All Diets</option>
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
                <option value='lacto vegetarian'>Lacto Vegetarian</option>
                <option value='ovo vegetarian'>Ovo Vegetarian</option>
            </select>
            <br/>
            <Paginated recipesPage={recipesPage} allRecipes={order === ''?allRecipes:recipeFilter} paginado={paginado}/>
            <br/>
            {<div>
                    {recipesCurrent.length?recipesCurrent.map((recipe) => {
                        return (
                            <div key={recipe.id}>
                            <Recipe 
                            name={recipe.name}
                            diets={recipe.diets.map(r=>r)}
                            image={recipe.image}
                            id={recipe.id}
                            key={recipe.id}
                            />
                            </div>)
                    }
                    ):  <div>
                        <h3>Oops! there are no recipes for that filter</h3>
                        <p>Try filtering again</p>
                        <p>Want to create your own recipe?</p>
                        <p><NavLink to={'/create/recipe'}>Click Here!</NavLink></p>
                        </div>}
            </div>}
        </div>
    )
}