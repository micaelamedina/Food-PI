import { CREATE_RECIPE, GET_ALL_RECIPES, GET_DETAILS, GET_RECIPES_BY_DIET, GET_RECIPE_BY_NAME, GET_RECIPE_DIET, GET_TYPE_DIETS, GET_ORDER_SCORE, GET_ORDER_NAME } from "../actions"

const initialState = {
    recipes: [],
    diets: [],
    details: {},
    recipeFilter: [],
    order: ''
};


export default function rootReducer(state=initialState, action) {
        switch(action.type) {
            case CREATE_RECIPE:
                return {
                    ...state,
                };
            case GET_ALL_RECIPES:
                return {
                    ...state,
                    recipes: action.payload,
                    order: ''
                };
            case GET_RECIPES_BY_DIET: 
                return {
                    ...state,
                    recipesFilterByDiet: action.payload
                };
            case GET_TYPE_DIETS:
                return {
                    ...state,
                    diets: action.payload
                };
            case GET_RECIPE_BY_NAME:
                let recipeName = action.payload.msg ? [] : action.payload;
                return {
                ...state,
                recipeFilter: recipeName,
                order: GET_RECIPE_BY_NAME
                };
            case GET_DETAILS: 
                return {
                    ...state,
                    details: action.payload
                };
            case GET_RECIPE_DIET:
                const allRecipesDiet = state.recipeFilter.length >= 1 ? state.recipeFilter : state.recipes;
                const dietFilter = action.payload === 'all diets' ? allRecipesDiet : allRecipesDiet.filter(r=>r.diets.includes(action.payload));
                return {
                    ...state,
                    recipeFilter: dietFilter,
                    order: action.payload
                };
            case GET_ORDER_SCORE:
                const allRecipesScore = state.recipeFilter.length >= 1 ? state.recipeFilter : state.recipes;
                const orderScore = action.payload === 'scoreDesc' ? allRecipesScore.sort((a,b)=>{
                    if(a.score < b.score) {
                        return 1;
                    };
                    if(a.score > b.score) {
                        return -1;
                    };
                    return 0;
                }) : allRecipesScore.sort((a,b)=>{
                    if(a.score > b.score) {
                        return 1;
                    };
                    if(a.score < b.score) {
                        return -1;
                    };
                    return 0;
                });
                return {
                    ...state,
                    recipeFilter: orderScore,
                    order: action.payload
                };
            case GET_ORDER_NAME:
                const allRecipesName = state.recipeFilter.length >= 1 ? state.recipeFilter : state.recipes;
                const orderName = action.payload === 'nameDesc' ? allRecipesName.sort((a,b)=>{
                    if(a.name < b.name) {
                        return 1;
                    };
                    if(a.name > b.name) {
                        return -1;
                    };
                    return 0;
                }) : allRecipesName.sort((a,b)=>{
                    if(a.name > b.name) {
                        return 1;
                    };
                    if(a.name < b.name) {
                        return -1;
                    };
                    return 0;
                });
                return {
                    ...state,
                    recipeFilter: orderName,
                    order: action.payload
                };
            default: return {...state};
        };
};