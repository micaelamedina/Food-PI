import React, { useEffect, useState } from "react";
import {useSelector, useDispatch }from 'react-redux';
import NavBar from "./NavBar";
import { getAllRecipes, getRecipesByDiet, orderByScore, orderByName, getAllTypeDiets, setCurrentPage } from "../redux/actions";
import { Recipe } from "./Recipe";
import Paginated from "./Paginated";
import { NavLink } from "react-router-dom";
import s from "./styles/Home.module.css";

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
    const order = useSelector((state)=>state.order);
    const currentPage = useSelector((state) => state.currentPage);
    const [recipesPage] = useState(9); //me guarda la cantidad de recetas por pagina.
    const lastRecipe = currentPage * recipesPage; //indice de la ultima receta.
    const firstRecipe = lastRecipe - recipesPage; //indice de la primer receta.
    const recipesCurrent = order === '' ? allRecipes.slice(firstRecipe, lastRecipe) : recipeFilter.slice(firstRecipe, lastRecipe); //corto el array desde el indice de la primer receta hasta el indice de la ultima receta (no la incluye)
    const [limitNumberPage] = useState(5); //limite de botones con numero de pag que quiero mostrar.
    const [maxLimitNumberPage, setmaxLimitNumberPage] = useState(5); //numero limite maximo de pagina.(la ultima) por ej si renderiza 5, la primera vez sera 5, la segunda vez sera 10 y asi sucesivamente.
    const [minLimitNumberPage, setminLimitNumberPage] = useState(0); //numero minimo de pagina. (la primera)

    const handleClickNumberPage = (event) => {
        dispatch(setCurrentPage(event.target.id));
    };

    const handleNextPage = () => {
        dispatch(setCurrentPage(currentPage + 1))
        if(currentPage + 1 > maxLimitNumberPage) {
            setmaxLimitNumberPage(maxLimitNumberPage + limitNumberPage);
            setminLimitNumberPage(minLimitNumberPage + limitNumberPage);
        };
    };

    const handlePrevPage = () => {
        dispatch(setCurrentPage(currentPage - 1))
        if(parseInt((currentPage - 1) % limitNumberPage) === 0) {
            setmaxLimitNumberPage(maxLimitNumberPage - limitNumberPage);
            setminLimitNumberPage(minLimitNumberPage - limitNumberPage);
        };
    };
    
    useEffect(()=>{
        dispatch(getAllRecipes());
        dispatch(getAllTypeDiets());
    },[dispatch]);

    function handleChangeDiet(event){
        event.preventDefault();
        if(event.target.value !== 'select') {
            dispatch(getRecipesByDiet(event.target.value));
            dispatch(setCurrentPage(1));
        };
    };

    function handleChangeScore(event){
        event.preventDefault();
        if(event.target.value !== 'order') {
            dispatch(setCurrentPage(1));
            dispatch(orderByScore(event.target.value));
        };
    };

    const handleEventClick = (event) => {
        event.preventDefault();
        dispatch(getAllRecipes());
        dispatch(setCurrentPage(1));
    };
    function handleChangeName(event){
        event.preventDefault();
        if(event.target.value !== 'order') {
            dispatch(setCurrentPage(1));
            dispatch(orderByName(event.target.value));
        };
    };
    
    return(
        <>
            <div className={s.principalDiv}>
            <div>
            <div className={s.navBar}>
                <NavBar/>
            </div>
            <div className={s.divCont}>
            <div className={s.filterBar}>
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
                <option value='select'>Select Diet Type</option>
                <option value='all diets'>All Diets</option>
                {
                     dietsUpper?dietsUpper.map((d, i)=>(
                        <option name={d.toLowerCase()}key={i} value={d.toLowerCase()}>
                          {d}
                        </option>
                      )): null
                }
            </select>
            <div >
                <button className={s.buttonReset} onClick={e=>handleEventClick(e)}>RESET</button>
            </div>
            </div>
            <br/>
            <div className={s.paginatedBar}>
            <Paginated recipesPage={recipesPage} allRecipes={order === ''?allRecipes:recipeFilter} 
            handleClickNumberPage={handleClickNumberPage}
            currentPage={currentPage}
            maxLimitNumberPage={maxLimitNumberPage}
            minLimitNumberPage={minLimitNumberPage}
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage}
            />
            </div>
            </div>
            </div>
            <br/>
            
            {<div className={recipesCurrent.length ? s.divCardContainer : s.divError}>
                    {recipesCurrent.length?recipesCurrent.map((recipe) => {
                        return (
                            <div key={recipe.id} className={s.divCard}>
                            <Recipe 
                            name={recipe.name}
                            diets={recipe.diets.map(r=>r)}
                            image={recipe.image !== "" ? recipe.image : "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg"}
                            id={recipe.id}
                            key={recipe.id}
                            />
                            </div>)
                    }
                    ):  <div className={s.divError}>
                        <h3  className={s.textError}>Oops! there are no recipes for that filter</h3>
                        <p className={s.textError}>Want to create your own recipe?</p>
                        <div className={s.divButtonError}>
                        <NavLink to={'/recipes/create'}><button className={s.buttonReset}>Click Here!</button></NavLink>
                        </div>
                        
                        </div>}
            </div>}
            
            </div>
        </>
    );
};