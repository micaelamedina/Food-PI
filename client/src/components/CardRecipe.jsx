import React from "react";

function detectDiet(diets) {
    if(diets.length){
        if(typeof diets[0] === 'string') {
            return diets;
        } else {
            let dietFilter = diets.map((d)=>d.name);
            return dietFilter;
        };
    } else {
        return diets;
    };
};
//steps api: es un array de objetos. [[{step: 'string'},{step:'string'}]]
//steps db: es un array. ['estos son los pasos de la receta']
function detectStep (steps) {
    if(steps.length) {
    if(typeof steps === 'string') {
        return steps;
    } else {
        let stepFilter = steps[0].steps.map((s)=>s.step);
        return stepFilter;
    };
    }  else {
        return steps;
    };
};

function dietsToUpperCase(dietas) {
    if(dietas === null || dietas === undefined || !dietas.length) {
        return [];
    };
    let newArrayDiets = dietas.map(d=> {
        return d[0].toUpperCase() + d.slice(1);
    });
    return newArrayDiets;
};
// diets db ->[{name:'vegan'},{'vegetarian'},'ketogenic']

//steps --> [{name: '', steps: [{step: 1},{step: 1}]}]

// function validateUrl(props) {
//     let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
//     var urlExp = new RegExp(expression);
//     if(!props.image.match(urlExp)) {
//         props.image = "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg"
//         return;
//     } else {
//         return;
//     };  
// }
export default function CardRecipe(props){
    let dietas = detectDiet(props.diets);
    dietas.length?dietas = dietsToUpperCase(dietas): dietas = [];
    let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    var urlExp = new RegExp(expression);
    let image = props.image === "" ? "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg" : props.image.match(urlExp)? props.image : "https://cdn.pixabay.com/photo/2015/08/25/03/50/background-906135_1280.jpg"; 
    console.log(image)
    const step = detectStep(props.steps);
    return(
        <>
            <h3>Name: {props.name}</h3>
            <h5>Diets:</h5>
            <ul>
            {
                dietas.length?dietas.map((e,i)=>{
                    return(
                        <li key={i}>{e}</li>
                    )
                }):'This recipe does not belong to a specific diet.'
            }
            </ul>
            <img src={image} alt="Img Recipe" />
            <h5>Score: {props.score}</h5>
            <h5>Health Score: {props.healthScore}</h5>
            <h5>Summary:</h5>
            <span>{props.summary}</span>
            <div>
                <h5>Steps:</h5>
                <ol>
                {
                    Array.isArray(step)?step.length?step.map((s,i)=>{
                        return(
                            <li key={i}>{s}</li>
                        )
                    }):'This recipe does not have a defined step by step.' : <li>{step}</li>
                }
                </ol>
            </div>
        </>
    )
}
//para dejar una imagen por default:
// props.image !== '' ? props.image : 'url'>
// o props.image ? props.image : 'url'