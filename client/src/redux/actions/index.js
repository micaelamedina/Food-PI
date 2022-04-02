import axios from 'axios';


export const CREATE_RECIPE = 'CREATE_RECIPE';
export const GET_ALL_RECIPES = 'GET_ALL_RECIPES';

// export function getAllRecipes() {
//     return function(dispatch) {
//        return fetch('http://localhost:3001/recipes')
//             .then(rta => rta.json())
//             .then(rta => {dispatch({type: GET_ALL_RECIPES, payload: rta})})
//     };
// };

export function getAllRecipes() {
    return async function(dispatch) {
        let json = await axios.get('http://localhost:3001/recipes',{});
        return dispatch({type: GET_ALL_RECIPES, payload: json.data});
    };
};

export const createRecipe = (recipe) => {
    return {type: CREATE_RECIPE, payload: recipe}
};