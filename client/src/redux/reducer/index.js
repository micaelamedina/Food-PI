import { CREATE_RECIPE, GET_ALL_RECIPES, GET_DETAILS, GET_RECIPES_BY_DIET, GET_RECIPE_BY_ID, GET_RECIPE_BY_NAME, GET_TYPE_DIETS,  } from "../actions"

const initialState = {
    recipes: [],
    diets: [],
    details: {},
    recipesFilterByDiet: [],
    recipesFilterByName: []
}


export default function rootReducer(state=initialState, action) {
        switch(action.type) {
            case CREATE_RECIPE:
                return {
                    ...state,
                    recipes: action.payload //[...state.recipes, {...action.payload}]
                };
            case GET_ALL_RECIPES:
                return {
                    ...state,
                    recipes: action.payload
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
            case GET_RECIPE_BY_ID:
                return {
                    ...state,
                    recipes: action.payload
                };
                case GET_RECIPE_BY_NAME:
                    return {
                    ...state,
                    recipes: action.payload
                };
                case GET_DETAILS: 
                    return {
                        ...state,
                        details: action.payload
                    }
            default: return {...state};
        };
};