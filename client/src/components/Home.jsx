import React, { useEffect, useState } from "react";
import {useSelector, useDispatch }from 'react-redux';
import NavBar from "./NavBar";
import { getAllRecipes, getRecipesByDiet, orderByScore, orderByName, getAllTypeDiets } from "../redux/actions";
import { Recipe } from "./Recipe";
import Paginated from "./Paginated";
import { NavLink } from "react-router-dom";

const dietsToUpperCase = (dietsArray) => {
    let newArrayDiets = dietsArray.map(d=> {
        return d.name[0].toUpperCase() + d.name.slice(1);
    });
    return newArrayDiets;
  };

export default function Home(props) {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
    const recipeFilter = useSelector((state)=>state.recipeFilter);
    const allDiets = useSelector((state) => state.diets);
    const dietsUpper = dietsToUpperCase(allDiets);
    const order = useSelector((state)=>state.order)
    const [currentPage, setCurrentPage] = useState(1); //me guarda la pagina actual.
    const [recipesPage] = useState(9); //me guarda la cantidad de recetas por pagina. //ver que no rompa no declarar setRecipesPage, lo saque por el warning.
    const lastRecipe = currentPage * recipesPage; //indice de la ultima receta.
    const firstRecipe = lastRecipe - recipesPage; //indice de la primer receta.
    const recipesCurrent = order === '' ? allRecipes.slice(firstRecipe, lastRecipe) : recipeFilter.slice(firstRecipe, lastRecipe); //corto el array desde el indice de la primer receta hasta el indice de la ultima receta (no la incluye)
    const [limitNumberPage] = useState(5); //limite de botones con numero de pag q quiero mostrar.
    const [maxLimitNumberPage, setmaxLimitNumberPage] = useState(5); //numero limite maximo de pagina.(la ultima) por ej si renderiza 5, la primera vez sera 5, la segunda vez sera 10 y asi sucesivamente.
    const [minLimitNumberPage, setminLimitNumberPage] = useState(0); //numero minimo de pagina. (la primera)

    const handleClickNumberPage = (event) => {
        setCurrentPage(event.target.id);
       // setRecipesPage(9) //ver que esto no rompa nada. es para que no este todo el tiempo haciendo el warning
    };
    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
        if(currentPage + 1 > maxLimitNumberPage) {
            setmaxLimitNumberPage(maxLimitNumberPage + limitNumberPage);
            setminLimitNumberPage(minLimitNumberPage + limitNumberPage);
        };
    };
    const handlePrevPage = () => {
        setCurrentPage(currentPage -1)
        if(parseInt((currentPage - 1) % limitNumberPage) === 0) {
            setmaxLimitNumberPage(maxLimitNumberPage - limitNumberPage);
            setminLimitNumberPage(minLimitNumberPage - limitNumberPage);
        }
    };
    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch]);

    useEffect(()=>{
        dispatch(getAllTypeDiets())
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
                <option>Select Type Diet</option>
                <option value='all diets'>All Diets</option>
                {
                     dietsUpper?dietsUpper.map((d, i)=>(
                        <option name={d.toLowerCase()}key={i} value={d.toLowerCase()}>
                          {d}
                        </option>
                      )):''
                }
                
                {/* <option value='paleolithic'>Paleolithic</option>
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
                <option value='ovo vegetarian'>Ovo Vegetarian</option> */}
            </select>
            <br/>
            <Paginated recipesPage={recipesPage} allRecipes={order === ''?allRecipes:recipeFilter} 
            handleClickNumberPage={handleClickNumberPage}
            currentPage={currentPage}
            maxLimitNumberPage={maxLimitNumberPage}
            minLimitNumberPage={minLimitNumberPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            />

            <br/>
            {<div>
                    {recipesCurrent.length?recipesCurrent.map((recipe) => {
                        return (
                            <div key={recipe.id}>
                            <Recipe 
                            name={recipe.name}
                            diets={recipe.diets.map(r=>r)}
                            image={recipe.image !== "" ? recipe.image : "./styles/img/defaultImage.jpg"}
                            id={recipe.id}
                            key={recipe.id}
                            />
                            </div>)
                    }
                    ):  <div>
                        <h3>Oops! there are no recipes for that filter</h3>
                        <p>Try filtering again</p>
                        <p>Want to create your own recipe?</p>
                        <p><NavLink to={'/recipes/create'}>Click Here!</NavLink></p>
                        </div>}
            </div>}
        </div>
    )
}