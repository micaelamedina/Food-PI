import React, {useEffect, useState} from "react";
import {useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate} from "react-router-dom";
import { createRecipe, getAllTypeDiets } from "../redux/actions";
import NavBar from "./NavBar";

//Pone la primer letra de mi array de dietas en mayúscula.
const dietsToUpperCase = (dietsArray) => {
  let newArrayDiets = dietsArray.map(d=> {
      return d.name[0].toUpperCase() + d.name.slice(1);
  });
  return newArrayDiets;
};
function isObjEmpty(obj) {
  if(Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
};
const inputValidate = (input) => {
  let errors = {};
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
} if(input.diets.length === 0) {
  errors.diets = 'You must select at least one type of diet'
} if(input.steps === "") {
  errors.steps = 'The steps of the recipe is required'
}

return errors;
};

export default function RecipeCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const diets = useSelector((state) => state.diets);
  let dietsUpper = dietsToUpperCase(diets);
  const [input, setInput] = useState({
      name: "",
      summary: "",
      score: "",
      healthScore: "",
      steps: "",
      diets: [],
      image: ""
  });
  const [errors, setErrors] = useState({});
  const [bool, setBool] = useState(true);
  useEffect(() => {
    dispatch(getAllTypeDiets())
  }, [dispatch]);

  const handleChangeInput = (event) => {
      event.preventDefault();
      setErrors(inputValidate({
          ...input,
          [event.target.name]: event.target.value
      }));
      let stateBool = isObjEmpty(errors) !== true ? true : false;
      setBool(stateBool)
      setInput({
        ...input,
        [event.target.name]: event.target.value
      });
  };

  const handleChangeSelect = (event) => {
      event.preventDefault();
      setErrors(inputValidate({
        ...input,
        [event.target.name]: event.target.value
      }));
      let stateBool = isObjEmpty(errors) !== true ? true : false;
      setBool(stateBool)
      setInput({
        ...input,
        diets: [...input.diets, event.target.value]
      });
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      dispatch(createRecipe(input));
      alert('Recipe added successfully 😁');
      setInput({
        name: "",
        summary: "",
        score: "",
        healthScore: "",
        steps: "",
        diets: [],
        image: ""
      });
      navigate('/home');
  };
  const handleClikDelete = (event) => {
    console.log(event.target.value)
    event.preventDefault();
    setInput({
      ...input,
      diets: input.diets.filter((d) => d.toLowerCase() !== event.target.value.toLowerCase())
    });
  }
  return (
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
        <div>
            <form onSubmit={(e)=>handleSubmit(e)}>
              <div>
                <label>Name</label>
                <input type="text" placeholder="Recipe Name" name={"name"} value={input.name} onChange={(e)=>handleChangeInput(e)}/>
                {
                  errors.name && <p>{errors.name}</p>
                }              
              </div>
              <div>
                <label>Summary</label>
                <input type="text" placeholder="Recipe summary" name={"summary"} value={input.summary} onChange={(e)=>handleChangeInput(e)}/>
                {
                  errors.summary && <p>{errors.summary}</p>
                } 
              </div>
              <div>
                <label>Image</label>
                <input type="text" placeholder="Recipe image" name={"image"} value={input.image} onChange={(e)=>handleChangeInput(e)}/>
                {
                  errors.image && <p>{errors.image}</p>
                } 
              </div>
              <div>
                <label>Score</label>
                <input type="number" placeholder="Recipe Score" name={"score"} value={input.score} onChange={(e)=>handleChangeInput(e)}/>
                {
                  errors.image && <p>{errors.image}</p>
                } 
              </div>
              <div>
                <label>Healthy food level</label>
                <input type="number" placeholder="Healthy food level of your recipe" name={"healthScore"} value={input.healthScore} onChange={e=>handleChangeInput(e)}/>
              </div>
              <div>
                <label>Steps</label>
                <input type="text" placeholder="Steps" name={"steps"} value={input.steps} onChange={e=>handleChangeInput(e)}/>
              </div>
              <div>
              <label>Diets</label>
                <select onChange={e=>handleChangeSelect(e)}>
                  <option value="selectDiets">Select Diets</option>
                  {
                    dietsUpper?dietsUpper.map((d, i)=>(
                      <option key={i} value={d.toLowerCase()}>
                        {d}
                      </option>
                    )):''
                  }
                </select>
              <div>
                <ul>
                  {
                    input.diets.length >= 1 ? input.diets.map((d, i) => (
                      <div key={i}>
                      <li>{d[0].toUpperCase() + d.slice(1)}</li>
                      <button value={d} onClick={(e)=>handleClikDelete(e)}>x</button>
                      </div>
                    )) : <p>You can select one or more types of diets</p>
                  }
                </ul>
              </div>
              </div>
              <br/>
              <div>
                <button type="submit" disabled={bool}>Add Recipe</button>
                {
                  bool && <p>Please complete the form</p>
                }
              </div>
              <div>
                <button type="submit">Reset Form</button>
              </div>
            </form>
        </div>
  </div>
  )

}
//d.name[0].toUpperCase() + d.name.slice(1);