import { useEffect } from "react";
import {useSelector, useDispatch }from 'react-redux';
import NavBar from "./NavBar";
import { getAllRecipes, getAllRecipesByDiet } from "../redux/actions";
import { Recipe } from "./Recipe";

export default function Home(props) {
    const dispatch = useDispatch();
    const allRecipes = useSelector((state) => state.recipes);
   // const recipesByDiet = useSelector((state) => state.recipesFilterByDiet);
    useEffect(()=>{
        dispatch(getAllRecipes());
    },[dispatch]);

    const handleEventClick = (event) => {
        event.preventDefault();
        dispatch(getAllRecipes());
    };

    function handleChangeDiet(event){
        event.preventDefault();
        const eventValue = event.target.value;
        if(eventValue === 'alldiets') {
            dispatch(getAllRecipes());
        } else {
            const allrecetas = [...allRecipes];
            const filterDiet = allrecetas.filter(r=> r.diets.find(d=>d === eventValue));
            dispatch(getAllRecipesByDiet(filterDiet));
    };
//     function handleChangeDiet(event){
//         event.preventDefault();
//         const eventValue = event.target.value;
//         if(eventValue === 'alldiets') {
//             dispatch(getAllRecipes());
//         } else {
//             const filterDiet = allRecipes.filter(r=> r.diets.find(d=>d === eventValue));
//             if(filterDiet.length) {
//                 dispatch(getAllRecipesByDiet(filterDiet));
//             } else {
//                 return(
//                     <div><p>Error</p></div>
//                 )
//             }
            
//     };
// }
}
    return(
        <div>
            <div>
                <NavBar/>
            </div>
            <div>
                <button onClick={e=>handleEventClick(e)}>Reload</button>
            </div>
            <select>
                <option value='nameAsc'>Ascendente</option>
                <option value='nameDesc'>Descendente</option>
            </select>
            <select>
                <option value='scoreAsc'>Score Ascendente</option>
                <option value='scoreDesc'>Score Descendente</option>
            </select>
            <select onChange={e=>handleChangeDiet(e)}>
                <option value='alldiets'>All Diets</option>
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
            {<div>
                    {allRecipes?.map((recipe) => {
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
            </div>}
        </div>
    )
}