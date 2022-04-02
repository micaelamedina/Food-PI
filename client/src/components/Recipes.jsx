import React from "react";
import * as ReactRedux from 'react-redux';
import Recipe from './Recipe';

export const Recipes = ({recipes}) => {
    return(
        <>
            {
                recipes && recipes.map(r => <div>
                    <Recipe key={r.id} name={r.name} diets={r.diets} image={r.image} />
                </div>)
            }
        </>
    )

}