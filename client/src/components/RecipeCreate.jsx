import React, {useEffect, useState} from "react";
import {useDispatch, useSelector } from 'react-redux'
import { NavLink} from "react-router-dom";
import { createRecipe, getAllTypeDiets } from "../redux/actions";
import NavBar from "./NavBar";
import s from '../components/styles/RecipeCreate.module.css';

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

// function* incremental() {
//   let index = 1
//   while(true) {
//       yield index;
//       index++;
//   };
// };
// let idIncremental = incremental();

// const inputNameValidate = (input) => {
//   let errors = {}
//   if(!input.name || input.name === "") {
//      errors.name = 'The name of the recipe is required' 
//   }
//   if(typeof Number(input.name) === 'number') {
//      errors.name = 'El nombre de la receta no puede contener solo numeros.' 
//   };
//   return errors;
// };

// const inputScoreValidate = (input, prop) => {
//  let nameMsg = "";
//  let errors = {};
//  if(prop === 'score') {
//    nameMsg = 'score'
//  } else if(prop === 'healthScore') {
//    nameMsg = 'health score'
//  }
//  if(!input[prop] || input[prop] === "") {
//    errors[prop] = `The ${nameMsg} of the recipe is required`
//  }
//  if(typeof input[prop] !== 'number') {
//    errors[prop] = `El ${nameMsg} de la receta solo admite numeros`
//  }
//  if(input[prop] > 100 ) {
//    errors[prop] = `El ${nameMsg} maximo es 100`
//  };
//  return errors;
// };

const inputStepsDietsValidate = (input) => {
  let errors = {};
     if(input.step === "") {
        errors.steps = `Los pasos no pueden ser nulos`
    } 
  return errors;
};

// const inputImageValidate = (input) => {
//   let errors = {};
//   let exp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
//  // let expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
//   var urlExp = new RegExp(exp);
//   if(!input.image || input.image === "") {
//     errors.image = 'Url is required'
//   }
//   if(!input.image.match(urlExp)) {
//     errors.image = 'Ingrese url valida.'
//   }
//   return errors;
//};

const inputValidate = (input) => {
  let errors = {};
 // let expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
  //var urlExp = new RegExp(expression);

  if(!isNaN(Number(input.name))) {
    errors.name = 'El nombre de la receta no puede contener solo numeros.' 
 } if(input.name === "") {
  errors.name = 'The name of the recipe is required';
} if(!input.score || input.score === "") {
  errors.score = `The score of the recipe is required`
} if(isNaN(Number(input.score))) {
  errors.score = `El score de la receta solo admite numeros`
} if(input.score > 100 ) {
  errors.score = `El health score maximo es 100`
} if(input.score < 0) {
  errors.score = `El health score minimo es 0`
} if(!input.healthScore || input.healthScore === "") {
  errors.healthScore = `The health score of the recipe is required`
} if(isNaN(Number(input.healthScore))) {
  errors.healthScore = `El health score de la receta solo admite numeros`
} if(input.healthScore > 100 ) {
  errors.healthScore = `El health score maximo es 100`
} if(input.healthScore < 0) {
  errors.healthScore = `El health score minimo es 0`
} if(input.step === "") {
  errors.step = `The steps of the recipe is required`}
   if(input.summary === "") {
  errors.summary = 'The summary of the recipe is required';
} //if(!input.image.match(urlExp) && input.image !== "") {
//   errors.image = 'La URL no es valida. Debe ingresar una valida. Si deja en blanco va una por defecto.'}
 if(input.diets.length === 0) {
  errors.diets = `The diets of the recipe is required`
}
return errors;
}

function isObjEmpty(obj) {
  if(Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};
export default function RecipeCreate() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        name: "",
        summary: "",
        image: "",
        score: "",
        healthScore: "",
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
   // const [inputDiet, setInputDiet] = useState({name:"" });
    //se usa para agregar step al arreglo de steps.
    const [step, setStep] = useState({step:""});
    //errores para validar formulario
    const [errors, setErrors] = useState({});
    const [disabled, setDisabled] = useState({
      disabled: true
    });
    //Al dar click en en botón Add Steps se agrega un step con el contenido del input que se completa al lado de dicho botón.
    //, id: idIncremental.next().value
    const addSteps = (e) => {
      setInput({...input, steps: [...input.steps, {...step}] });
      setStep({step:""})
    }
    //Al dar click en deleteSteps permite eliminar steps que se hayan agregado (antes de enviar el formulario) y ya no se quieren.
    const deleteSteps = (event) => {
      console.log(event)
       let filterStep = input.steps.filter(s=>s.step !== event.target.previousElementSibling.innerText);
       console.log(filterStep);
       setInput({...input, steps: filterStep})
    }
    //inputAddStepsChange permite captar el valor del input donde escribimos los steps.
    //step: {step:""}
    const inputAddStepsChange = (event) => {
      setStep({
      ...step,
      [event.target.name]: event.target.value,
    });
    setErrors(inputStepsDietsValidate({
      ...errors,
      [event.target.name]: event.target.value,
  }));
    setDisabled({
      disabled: isObjEmpty(errors)
    });
  };
    
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
          setErrors(inputValidate({
            ...input,
            ...errors,
            [event.target.name]: event.target.value,
        }))
          setDisabled({
            disabled: isObjEmpty(errors)
        });
          setInput((prev) => ({
            ...prev,
            [event.target.name]: Number(event.target.value),
        }));
        } else {
          setErrors(inputValidate({
            ...input,
            ...errors,
            [event.target.name]: event.target.value,
        }))
          setDisabled({
            disabled: isObjEmpty(errors)
        });
          setInput((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
          }));
        };
      } else {
        setErrors(inputValidate({
          ...input,
          ...errors,
          [event.target.name]: event.target.value,
      }))
      setDisabled({
        disabled: isObjEmpty(errors)
      });
        setInput((prev) => ({
          ...prev,
          [event.target.name]: event.target.value,
        }));
      };
    };

    //Enviar la receta.
    const handleSubmit = (event) => {
      event.preventDefault();
      if(isObjEmpty(errors) === true) {
        dispatch(createRecipe(input));
        console.log(input)
        setInput({name: "", summary: "", image: "", score: "", healthScore: "", steps: [], diets: []});
        setDiet({ 1: false, 2: false, 3: false, 4: false, 5: false, 6: false, 7: false, 8: false, 9: false, 10: false, 11: false, 12: false, 13: false,})
        alert('Recipe added successfully 😁');
      } else {
        let clave = Object.keys(errors);
        return (<div>
          <ul>
          {clave.length?clave.map((c,i)=>{
            return(
              <li>Campo: {c} Error: {errors[clave[i]]}</li>
            )
        }):'bueno'}
          </ul>
        </div>)
        
      }
        
        
    };
    //Reseteo del formulario.
    const handleReset = (event) =>{
        event.preventDefault();
        setInput({name: "", summary: "", image: "", score: "", healthScore: "", steps: [], diets: []});
    };

    //diets: [{name: 'vegan'}, {name: 'vegetarian'}]
    //diet: {1: false, 2: false, 3:false}
    //inputDiet: {name:vegan}
    // const handleChangeCheckbox = (event) =>{
    //   event.preventDefault();
    //   console.log(event.target.name) // numero de receta cargado en diet.
    //   console.log(event.target.value) //nombre de la receta.
    //   setInput({
    //     ...input,
    //     diets: [...input.diets, {name: event.target.value}]
    //   });
    //   setDiet({
    //     ...diet,
    //     [event.target.name]: false,
    //   });

  //}
  //handleChangeCheckbox permite tildar y destildar en el formulario modificando el estado que se envia al final. De esta manera evitamos que si al seleccionar un tipo de dieta queremos cambiarla, no la agregue al array de dietas.
    // const handleChangeCheckbox = (event) => {
    //   event.preventDefault();
    //   const filter = input.diets.filter(d=> d.name === event.target.value);
    //   if(filter.length) {
    //       let dietFilter = input.diets.filter(d=>d.name !== event.target.value);
    //       setInput({
    //         ...input,
    //         ...errors,
    //         diets: dietFilter
    //       });
    //       setDiet({
    //         ...diet,
    //         [event.target.name]: false
    //       });
    //       setDisabled({
    //         ...errors,
    //         ...input,
    //         disabled: isObjEmpty(errors)
    //       });
    //   } else {
    //       setInput({
    //         ...input,
    //         diets: [...input.diets, {name: event.target.value}]
    //       });
    //       setDiet({
    //         ...diet,
    //         [event.target.name]: true
    //       })
    //   };
    //   setErrors(inputStepsDietsValidate({
    //     ...errors,
    //     ...input,
    //     ...diet,
    //     [event.target.name]: event.target.value,
    // }))
    // setDisabled({
    //   ...errors,
    //   ...disabled,
    //   ...input,
    //   disabled: isObjEmpty(errors)
    // });
    // };
    const handleChangeCheckbox = (event) => {
      event.preventDefault();
      const filter = input.diets.filter(d=> d === event.target.value);
      if(filter.length) {
          let dietFilter = input.diets.filter(d=>d !== event.target.value);
          setErrors(inputValidate({
            ...input,
            ...errors,
            diets: event.target.value
          }))
          setDisabled({
            disabled: isObjEmpty(errors)
          });
          setInput({
            ...input,
            diets: dietFilter
          });
          setDiet({
            ...diet,
            [event.target.name]: false
          });
      } else {
        setErrors(inputValidate({
          ...input,
          ...errors,
          diets: event.target.value
        }))
        setDisabled({
          disabled: isObjEmpty(errors)
        });
          setInput({
            ...input,
            diets: [...input.diets, event.target.value]
          });
          setDiet({
            ...diet,
            [event.target.name]: true
          })
          
      };
    //   setErrors(inputStepsDietsValidate({
    //     ...errors,
    //     ...input,
    //     ...diet,
    //     [event.target.name]: event.target.value,
    // }))
    // setDisabled({
    //   ...errors,
    //   ...disabled,
    //   ...input,
    //   disabled: isObjEmpty(errors)
    // });
    };
    return(
        <>
            <div className={s.divGral}>
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
                    {
                      errors.name && (
                        <p>{errors.name}</p>
                      )
                    }
                  </div>
                  <div>
                    <label>Summary</label>
                    <input type="text" placeholder="Recipe summary" name={"summary"} value={input.summary} onChange={(e)=>handleChange(e)}/>
                    {
                      errors.summary && (
                        <p>{errors.summary}</p>
                      )
                    }
                  </div>
                  <div>
                    <label>Image</label>
                    <input type="text" placeholder="Recipe image" name={"image"} value={input.image} onChange={(e)=>handleChange(e)}/>
                    {/* {
                      errors.image && (
                        <p>{errors.image}</p>
                      )
                    } */}
                  </div>
                  <div>
                    <label>Score</label>
                    <input type="text" placeholder="Recipe Score" name={"score"} value={input.score} onChange={(e)=>handleChange(e)}/>
                    {
                      errors.score && (
                        <p>{errors.score}</p>
                      )
                    }
                  </div>
                  <div>
                    <label>Healthy food level</label>
                    <input type="text" placeholder="Healthy food level of your recipe" name={"healthScore"} value={input.healthScore} onChange={e=>handleChange(e)}/>
                    {
                      errors.healthScore && (
                        <p>{errors.healthScore}</p>
                      )
                    }
                  </div>
                  <div>
                    <label>Steps:</label>
                    <input type="text" placeholder="Tell us the step by step of your recipe here" name={"step"} value={step.step} onChange={e=>inputAddStepsChange(e)}/>
                    <input type="button" value="Add Steps" name={"steps"} onClick={(e)=>addSteps(e)} disabled={disabled.disabled}/>
                    {
                      input.steps?input.steps.map((el, i) => (
                        <div key={`step-${i}`}>
                          <label htmlFor={`step-${i}`}>{`Step #${i + 1}`}</label>
                          <p>{el.step}</p>
                          <input type="button" value="X" name="delete" id={++i} key={i} onClick={(e) => deleteSteps(e)}/>
                        </div>
                      )) : 'Aguardando pasos'
                    }
                    {
                      errors.steps && (
                        <p>{errors.steps}</p>
                      )
                    }
                  </div>
                      <h5>Diet Types</h5>
                      <p>Select what type of diets your recipe can belong to.</p>
                      <p>Your recipe can belong to one or more types of diets.</p>
                  <div>
                  {
                      dietsUpperCase?dietsUpperCase.map((e,i)=>{
                          return(
                              <div key={i}>
                              <label>{e}</label>
                              <input type="checkbox" name={diets[i].id} 
                              value={e.toLowerCase()} checked={diet[diets[i].id]} onChange={(e)=>handleChangeCheckbox(e)}/>
                              </div>
                          );
                      }):'This recipe does not belong to a specific diet.'
                  }
                  {
                      errors.diets && (
                        <p>{errors.diets}</p>
                      )
                  }
                  </div>
                  <input type={"submit"} value={"Add Recipe"} />
                  <button type={"reset"} onClick={(e)=>handleReset(e)}>Reset Form</button>
              </form>
            </div>
        </>
    );
};

