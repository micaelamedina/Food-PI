import React, {useEffect, useState} from "react";
import * as ReactRedux from 'react-redux'
import { NavLink } from "react-router-dom";
import { createRecipe } from "../redux/actions";
import NavBar from "./NavBar";
import { getAllTypeDiets } from "../redux/actions";

const dietsToUpperCase = (dietsArray) => {
  let newArrayDiets = dietsArray.map(d=> {
      return d.name[0].toUpperCase() + d.name.slice(1);
  })
  return newArrayDiets;
}
export default function RecipeCreate() {
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: '',
        healthScore: '',
        steps: [],
        diets: [],
    });
   
    const [step, setStep] = useState({step:''});

    const addSteps = (e) => {
      setInput({...input, steps: [...input.steps, {...step, id: input.steps.length+1}] });
      setStep({step:''})
    }
    const inputAddStepsChange = (e) => setStep({
      ...step,
      [e.target.name]: e.target.value,
    });

    const inputStepsChange = (e) => {
      console.log(e)
      const steps1 = {...input, steps: [...input.steps]};
      steps1.steps[Number(e.target.id)][e.target.dataset.name] = e.target.value;
      setInput(steps1);
    };

    const dispatch = ReactRedux.useDispatch();
    
    useEffect(() => {
        dispatch(getAllTypeDiets())
    }, [dispatch])

    const diets = ReactRedux.useSelector((state) => state.diets);
    let dietas = dietsToUpperCase(diets);

    const handleChange = (event) => {
        event.preventDefault();
        setInput((prev) => ({...prev, [event.target.name]: event.target.value}));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(input));
        setInput({name: '', summary: '', score: '', healtyScore: '', steps: [], step: '', diets: []});
        alert('Recipe added successfully 😁');
    };

    const handleReset = (event) =>{
        event.preventDefault();
        setInput({name: '', summary: '', score: '', healtyScore: '', steps: [], step: '', diets: []});
    };
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
    const handleChangeCheckbox = (event) => {
        event.preventDefault();
        setInput({
          ...input,
          diets: [...input.diets, event.target.value],
        });
        setDiet({
          ...diet,
          [event.target.name] : true
        })
    }
       
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
              <form onSubmit={e=>handleSubmit(e)} method='post'>
                  <div>
                    <label>Name</label>
                    <input type="text" placeholder="Recipe Name" name={"name"} value={input.name} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Summary</label>
                    <input type="text" placeholder="Recipe summary" name={"summary"} value={input.summary} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Score</label>
                    <input type="text" placeholder="Recipe Score" name={"score"} value={input.score} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Healthy food level</label>
                    <input type="text" placeholder="Healthy food level of your recipe" name={"healtyScore"} value={input.healthScore} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Steps:</label>
                    <input type="text" placeholder="Tell us the step by step of your recipe here" name={"step"} value={step.step} onChange={e=>inputAddStepsChange(e)}/>
                    <input type="button" value="steps" name={"Add Step"} onClick={e=>addSteps(e)}/>
                    {
                      input.steps?input.steps.map((el, i) => (
                        <div key={`step-${i}`}>
                          <label htmlFor={`step-${i}`}>{`Step #${i + 1}`}</label>
                          <input
                              type="text"
                              name={`Step-${i}`}
                              id={i}
                              data-name="step"
                              value={el.step}
                              onChange={e=>inputStepsChange(e)}
                              key={i}
                          />
                        </div>
                      )) : 'Aguardando pasos'
                    }
                  </div>
                      <h5>Diet Types</h5>
                      <p>Select what type of diets your recipe can belong to.</p>
                      <p>Your recipe can belong to one or more types of diets.</p>
                  <div>
                  {
                      dietas?dietas.map((e,i)=>{
                          return(
                              <div>
                              <label>{e}</label>
                              <input type="checkbox" name={diets[i].id} 
                              value={e.toLowerCase()} checked={diet[i-1]} onChange={(e)=>handleChangeCheckbox(e)}/>
                              </div>
                          )
                      }):'This recipe does not belong to a specific diet.'
                  }
                  </div>
                  
                  <input type={"submit"} value={"Add Recipe"}/>
                  <button type={"reset"} onClick={e=>handleReset(e)}>Reset Form</button>
              </form>

            </div>
        </>
    )
}