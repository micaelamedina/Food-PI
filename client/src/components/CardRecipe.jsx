import React from "react";

const detectDiet = function(diets) {
    if(diets.length){
        if(typeof diets[0] === 'string') {
            return diets;
        } else {
            let dietFilter = diets.map((d)=>d.name);
            return dietFilter;
        };
    };
};
//steps api: es un array de objetos. [{step: 'string'},{step:'string'}]
//steps db: es un array. ['blabla', 'blabla']
const detectStep = function(steps) {
    if(typeof steps[0] === 'string') {
        return steps;
    } else {
        let stepFilter = steps[0].steps.map((s)=>s.step);
        return stepFilter;
    };
};
// const dietsToUpperCase = (dietas) => {
//     let newArrayDiets = dietas.map(d=> {
//         return d[0].toUpperCase() + d.slice(1);
//     })
//     return newArrayDiets;
// }
function dietsToUpperCase(dietas) {
    if(dietas === null || dietas === undefined || !dietas.length) {
        return [];
    }
    let newArrayDiets = dietas.map(d=> {
        return d[0].toUpperCase() + d.slice(1);
    })
    return newArrayDiets;
    }
//['vegan','vegetarian','ketogenic']

//steps --> [{name: '', steps: [{step: 1},{step: 1}]}]
export default function CardRecipe(props){
    let dietas = detectDiet(props.diets);
    dietas = dietsToUpperCase(dietas);
    const pasos = detectStep(props.steps);
    return(
        <>
            <h3>Name: {props.name}</h3>
            <h5>Diets:</h5>
            <ul>
            {
                dietas.length?dietas.map(e=>{
                    return(
                        <li>{e}</li>
                    )
                }):'This recipe does not belong to a specific diet.'
            }
            </ul>
            <img src={props.image} alt="Img Recipe" />
            <h5>Score: {props.score}</h5>
            <h5>Health Score: {props.healthScore}</h5>
            <h5>Summary:</h5>
            <span>{props.summary}</span>
            <div>
                <h5>Steps:</h5>
                <ol>
                {
                    pasos.length?pasos.map((s)=>{
                        return(
                            <li>{s}</li>
                        )
                    }) : 'This recipe does not have a defined step by step.'
                }
                </ol>
            </div>
        </>
    )
}