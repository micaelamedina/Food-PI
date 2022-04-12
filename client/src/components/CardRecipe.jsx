import React from "react";
import s from "./styles/RecipeDetail.module.css";
import { NavLink } from "react-router-dom";

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
    const step = detectStep(props.steps);
    console.log(props)
    return(
        <>
            <NavLink to={'/home'} style={{ textDecoration: 'none' }}><button className={s.buttonComeBack}>Back to home</button></NavLink>
            <div className={s.divContCard}>
            <div>
            <h3 className={s.h3Detail}>{props.name}</h3>
            <div>
            <img className={s.img} src={image} alt="Img Recipe" />
            </div>
            <h3 className={s.h3Detail}>Diets</h3>
            <ul className={s.ulDetail}>
            {
                dietas.length?dietas.map((e,i)=>{
                    return(
                        <li className={s.liDetail} key={i}>{e}</li>
                    )
                }):'This recipe does not belong to a specific diet.'
            }
            </ul>
            <div className={s.divScores}>
                <div>
                <h3 className={s.h3Detail}>Score</h3>
            <p className={s.pDetail}>{props.score}</p>
                </div>
            <div>
            <h3 className={s.h3Detail}>Health Score</h3>
            <p className={s.pDetail}>{props.healthScore}%</p>
            </div>
            
            </div>
            
            <h3 className={s.h3Detail}>Summary</h3>
            <span>{props.summary}</span>
            <div>
                <h3 className={s.h3Detail}>Steps</h3>
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
            </div>
            </div>
        </>
        
    )
}
//para dejar una imagen por default:
// props.image !== '' ? props.image : 'url'>
// o props.image ? props.image : 'url'