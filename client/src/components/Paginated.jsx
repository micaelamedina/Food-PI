import React from "react";


export default function Paginated({recipesPage, allRecipes, paginado}) {
    const numberPage = [];
    for (let i = 1; i <= Math.ceil(allRecipes.length / recipesPage); i++) {
            numberPage.push(i);
    };
    return(
        <div>
            <nav>
                <ul>
                    {
                        numberPage?numberPage.map(n => {
                            return <button key={n} onClick={(e)=>paginado(n)}>{n}</button>
                        }):<p>Loading...</p>
                    }
                </ul>
            </nav>
        </div>
    )
};