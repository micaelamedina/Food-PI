import React, {useEffect, useState} from "react";
import {useDispatch, useSelector } from 'react-redux'
import { NavLink} from "react-router-dom";
import { createRecipe, getAllTypeDiets } from "../redux/actions";
import NavBar from "./NavBar";

//(name, summary, score, healthScore, steps, image, diets) orden en el que recibe la info la api.
//cambie en el back lo que recibe la ruta y la funcion. estaba con parametros normales, los agregue en un objeto.
//funciona en postman pero hay que probarlo.

//Pone la primer letra de mi array de dietas en mayúscula.
const dietsToUpperCase = (dietsArray) => {
  let newArrayDiets = dietsArray.map(d=> {
      return d.name[0].toUpperCase() + d.name.slice(1);
  })
  return newArrayDiets;
}

//Genera un id incremental para que nunca se me repita el id de los steps.
function* incremental() {
  let index = 1
  while(true) {
      yield index;
      index++;
  };
};
let idIncremental = incremental();

export default function RecipeCreate() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: '',
        summary: '',
        image: '',
        score: '',
        healthScore: '',
        steps: [],
        diets: [],
    });
    //El numero de cada prop, es el número que le corresponde a cada tipo de dieta en el id de la bd.
    const [diet, setDiet] = useState({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
        10: false,
        11: false,
        12: false,
        13: false,
    });
    
    const [step, setStep] = useState({step:''});
    
    const [errors, setErrors] = useState({});

    //Al dar click en en botón Add Steps se agrega un step con el contenido del input que se completa al lado de dicho botón.
    //, id: idIncremental.next().value
    const addSteps = (e) => {
      setInput({...input, steps: [...input.steps, {...step}] });
      setStep({step:''})
    }
    //Al dar click en deleteSteps permite eliminar steps que se hayan agregado (antes de enviar el formulario) y ya no se quieren.
    const deleteSteps = (event) => {
      console.log(event)
       let filterStep = input.steps.filter(s=>s.step !== event.target.previousElementSibling.innerText);
       console.log(filterStep);
       setInput({...input, steps: filterStep})
    }
    //inputAddStepsChange permite captar el valor del input donde escribimos los steps.
    const inputAddStepsChange = (e) => setStep({
      ...step,
      [e.target.name]: e.target.value,
    });
    
    //useEffect se ejecuta cuando se monta el componente y cuando se genera algún cambio en diet. De esta manera al tildar los checkbox de dietas, el cambio se ve reflejado en el momento. Si no se coloca de esta manera, el cambio se efectúa cuando se vuelve a actualizar el componente.
    useEffect(() => {
      dispatch(getAllTypeDiets())
  }, [dispatch, diet])

    const diets = useSelector((state) => state.diets);
    let dietsUpperCase = dietsToUpperCase(diets);
    //Capta el valor de los inputs name, summary, score, healthScore,
    const handleChange = (event) => {
      event.preventDefault();
      if(event.target.name === 'healthScore' || event.target.name === 'score') {
        if(typeof event.target.value === 'number') {
          setInput((prev) => ({
            ...prev,
            [event.target.name]: Number(event.target.value),
          }));
        } else {
          setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }));
        };
      } else {
        setInput((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };
    };

    //Enviar la receta.
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(input));
        setInput({name: '', summary: '', image: '', score: '', healthScore: '', steps: [], diets: []});
        setDiet({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false,})
        alert('Recipe added successfully 😁');
    };
    //Reseteo del formulario.
    const handleReset = (event) =>{
        event.preventDefault();
        setInput({name: '', summary: '', image: '', score: '', healthScore: '', steps: [], diets: []});
    };
    
  //handleChangeCheckbox permite tildar y destildar en el formulario modificando el estado que se envia al final. De esta manera evitamos que si al seleccionar un tipo de dieta queremos cambiarla, no la agregue al array de dietas.
    const handleChangeCheckbox = (event) => {
      event.preventDefault();
      if(diet[event.target.name]) {
          let dietFilter = input.diets.filter(d=>d !== event.target.value);
          setInput({
            ...input,
            diets: dietFilter
          });
          setDiet({
            ...diet,
            [event.target.name]: false
          });
      } else {
          setInput({
            ...input,
            diets: [...input.diets, event.target.value]
          });
          setDiet({
            ...diet,
            [event.target.name]: true
          })
      };
    };

// const inputValidateComplete = (input) => {
    //     if(!input.name) {
    //       errors.name = 'The name of the recipe is required.' 
    //     } else if(!input.summary) {
    //       errors.summary = 'The summary of the recipe is required.'
    //     } else if (!input.score) {
    //       errors.score = 'The score of the recipe is required.'
    //     } else if (!input.healthScore) {
    //       errors.healthScore = 'The score of the recipe is required.'
    //     };
    //     return errors;
    // };

    const inputNameValidate = (input) => {
       if(!input.name || input.name === '') {
          errors.name = 'The name of the recipe is required' 
       }
       if(typeof Number(input.name) === 'number') {
          errors.name = 'El nombre de la receta no puede contener solo numeros.' 
       };
    };

    const inputScoreValidate = (input, prop) => {
      let nameMsg = '';
      if(prop === 'score') {
        nameMsg = 'score'
      } else if(prop === 'healthScore') {
        nameMsg = 'health score'
      }
      if(!input[prop] || input[prop] === '') {
        errors[prop] = `The ${nameMsg} of the recipe is required`
      }
      if(typeof input[prop] !== 'number') {
        errors[prop] = `El ${nameMsg} de la receta solo admite numeros`
      }
      if(input[prop] > 100 ) {
        errors[prop] = `El ${nameMsg} maximo es 100`
      };
    };
    






    return(
        <>
            <div>
              <div>
                  <NavLink to={'/home'}><button>Go to Home</button></NavLink>
              </div>
              <div>
                  <NavBar/>
              </div>
                <h3>Create New Recipe</h3>
                <p>You can then create a new recipe.</p>
                <p>To do this you must complete the following form.</p>
                <br />
            </div>
            <div>
              <form onSubmit={e=>handleSubmit(e)}>
                  <div>
                    <label>Name</label>
                    <input type="text" placeholder="Recipe Name" name={"name"} value={input.name} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Summary</label>
                    <input type="text" placeholder="Recipe summary" name={"summary"} value={input.summary} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Image</label>
                    <input type="text" placeholder="Recipe image" name={"image"} value={input.image} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Score</label>
                    <input type="text" placeholder="Recipe Score" name={"score"} value={input.score} onChange={(e)=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Healthy food level</label>
                    <input type="text" placeholder="Healthy food level of your recipe" name={"healthScore"} value={input.healthScore} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Steps:</label>
                    <input type="text" placeholder="Tell us the step by step of your recipe here" name={"step"} value={step.step} onChange={e=>inputAddStepsChange(e)}/>
                    <input type="button" value="Add Steps" name={"steps"} onClick={(e)=>addSteps(e)}/>
                    {
                      input.steps?input.steps.map((el, i) => (
                        <div key={`step-${i}`}>
                          <label htmlFor={`step-${i}`}>{`Step #${i + 1}`}</label>
                          <p>{el.step}</p>
                          <input type="button" value="X" name="delete" id={++i} key={i} onClick={(e) => deleteSteps(e)}/>
                        </div>
                      )) : 'Aguardando pasos'
                    }
                  </div>
                      <h5>Diet Types</h5>
                      <p>Select what type of diets your recipe can belong to.</p>
                      <p>Your recipe can belong to one or more types of diets.</p>
                  <div>
                  {
                      dietsUpperCase?dietsUpperCase.map((e,i)=>{
                          return(
                              <div>
                              <label>{e}</label>
                              <input type="checkbox" name={diets[i].id} 
                              value={e.toLowerCase()} checked={diet[diets[i].id]} onChange={(e)=>handleChangeCheckbox(e)}/>
                              </div>
                          );
                      }):'This recipe does not belong to a specific diet.'
                  }
                  </div>
                  <input type={"submit"} value={"Add Recipe"}/>
                  <button type={"reset"} onClick={(e)=>handleReset(e)}>Reset Form</button>
              </form>
            </div>
        </>
    );
};

