import { CREATE_RECIPE, GET_ALL_RECIPES } from "../actions"

const initialState = {
    recipes: []
}

//let index = 1;

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
            default: return {...state};
        };
};