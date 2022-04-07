import axios from 'axios';

export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_BY_DIET = 'GET_RECIPES_BY_DIET';
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME';
export const GET_DETAILS = 'GET_DETAILS';
export const GET_RECIPE_DIET = 'GET_RECIPE_DIET';
export const GET_ORDER_SCORE = 'GET_ORDER_SCORE';
export const GET_ORDER_NAME = 'GET_ORDER_NAME'

// export function getAllRecipes() {
//     return function(dispatch) {
//        return fetch('http://localhost:3001/recipes')
//             .then(rta => rta.json())
//             .then(rta => {dispatch({type: GET_ALL_RECIPES, payload: rta})})
//     };
// };f

//redux por si solo, no permite invocar funciones dento de las acciones, sino que permite unicamente objetos. 
//thunk es un middleware que permite funciones dentro de las acciones. estas funciones se resuelven de manera asíncrona.

export function getAllRecipes() {
    return async function(dispatch) {
        const allRecipes = await axios.get('http://localhost:3001/recipes');
        return dispatch({type: GET_ALL_RECIPES, payload: allRecipes.data});
    };
};

export const createRecipe = (input) => {
    return async function(dispatch) {
        const postRecipe = await axios.post('http://localhost:3001/recipe', input)
        console.log(postRecipe)
        console.log(postRecipe.data)
        return postRecipe;
    };
};

export const getAllRecipesByDiet = async (diet) => {
    const recipesFilterByDiet = await axios.get(`http://localhost:3001/diet/${diet}`);
    return ({type: GET_RECIPES_BY_DIET, payload: recipesFilterByDiet.data});
};

export const getRecipesByDiet = (diet) => {
    return {
        type: GET_RECIPE_DIET,
        payload: diet
    }
}

export const getAllTypeDiets = () => {
    return async function(dispatch) {
        const allTypeDiets = await axios.get('http://localhost:3001/types');
        return (dispatch({type: GET_TYPE_DIETS, payload: allTypeDiets.data}))
    };
};

export const getRecipeByName = (nameRecipe) => {
    return async function(dispatch) {
        const recipeByName = await axios.get(`http://localhost:3001/recipes?name=${nameRecipe}`);
        return (dispatch({type: GET_RECIPE_BY_NAME, payload: recipeByName.data}))
    };
};

export const getDetails = (idRecipe) => {
    return async function(dispatch) {
        const recipeDetail = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
        return(dispatch({type: GET_DETAILS, payload: recipeDetail.data}));
    };
};

// export const getDetails = (idRecipe) => dispatch => {
//     return fetch(`http://localhost:3001/recipes/${idRecipe}`)
//         .then(r => r.json())
//         .then(rta => {dispatch({type: GET_DETAILS, payload: rta})})
//     };

export const orderByScore = (order) => {
    return {
        type: GET_ORDER_SCORE,
        payload: order
    };
};

export const orderByName = (order) => {
    return {
        type: GET_ORDER_NAME,
        payload: order
    };
};

// export const orderByNameBack = (order) => {
//     return async function(dispatch) {
//         const recipesByName = await axios.get(`http://localhost:3001/recipe/order/${order}`);
//         return dispatch({type: GET_ORDER_NAME, payload: recipesByName.data})
//     };
// };

//IMPORTANTE:
/*
En el back esta creada la ruta para el ordenamiento de nombre de a-z z-a y el filtro por dieta.
ver de crear una ruta para filtro de recetas creadas por la bd y recetas creadas por la api.
las funciones ya estan creadas, son las que se concatenan.
*/