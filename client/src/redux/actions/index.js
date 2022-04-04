import axios from 'axios';

export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';
export const GET_RECIPES_BY_DIET = 'GET_RECIPES_BY_DIET';
export const GET_TYPE_DIETS = 'GET_TYPE_DIETS';
export const GET_RECIPE_BY_ID = 'GET_RECIPE_BY_ID';
export const GET_RECIPE_BY_NAME = 'GET_RECIPE_BY_NAME';
export const GET_DETAILS = 'GET_DETAILS';

// export function getAllRecipes() {
//     return function(dispatch) {
//        return fetch('http://localhost:3001/recipes')
//             .then(rta => rta.json())
//             .then(rta => {dispatch({type: GET_ALL_RECIPES, payload: rta})})
//     };
// };

//redux por si solo, no permite invocar funciones dento de las acciones, sino que permite unicamente objetos. 
//thunk es un middleware que permite funciones dentro de las acciones. estas funciones se resuelven de manera asíncrona.

export function getAllRecipes() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/recipes');
        return dispatch({type: GET_ALL_RECIPES, payload: json.data});
    };
};

//createRecipe sin termina.
export const createRecipe = async (input) => {
    let json = await axios.post('http://localhost:3001/recipe', input)
    return {type: CREATE_RECIPE, payload: json.data}
};

export const getAllRecipesByDiet = (diet) => {
        return ({type: GET_RECIPES_BY_DIET, payload: diet});
};


export const getAllTypeDiets = () => {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/types');
        return (dispatch({type: GET_TYPE_DIETS, payload: json.data}))
    };
};

export const getRecipeById = (idRecipe) => {
    return async function(dispatch) {
        let json = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
        return (dispatch({type: GET_RECIPE_BY_ID, payload: json.data}))
    };
};

export const getRecipeByName = (nameRecipe) => {
    return async function(dispatch) {
        let json = await axios.get(`http://localhost:3001/recipes?name=${nameRecipe}`);
        return (dispatch({type: GET_RECIPE_BY_NAME, payload: json.data}))
    };
};

export const getDetails = (idRecipe) => {
    return async function(dispatch) {
        let json = await axios.get(`http://localhost:3001/recipes/${idRecipe}`);
        return(dispatch({type: GET_DETAILS, payload: json.data}));
    };
};

// export const getDetails = (idRecipe) => dispatch => {
//     return fetch(`http://localhost:3001/recipes/${idRecipe}`)
//         .then(r => r.json())
//         .then(rta => {dispatch({type: GET_DETAILS, payload: rta})})
//     };