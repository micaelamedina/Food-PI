import React, {useState} from "react";
import * as ReactRedux from 'react-redux'
import { NavLink } from "react-router-dom";
import { createRecipe } from "../redux/actions";
import SearchBar from "./SearchBar";

export default function RecipeCreate() {
    const [input, setInput] = useState({
        name: '',
        summary: '',
        score: '',
        healtyScore: '',
        steps: '',
        diets: []
    });
    const dispatch = ReactRedux.useDispatch();
    const handleChange = (event) => {
        event.preventDefault();
        setInput((prev) => ({...prev, [event.target.name]: event.target.value}));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createRecipe(input));
        setInput({name: '', summary: '', score: '', healtyScore: '', steps: '', diets: []});
        alert('Recipe added successfully 😁');
    };
    const handleReset = (event) =>{
        event.preventDefault();
        setInput({name: '', summary: '', score: '', healtyScore: '', steps: '', diets: []});
    };
    return(
        <>
            <div>
              <div>
                  <NavLink to={'/home'}><button>Go to Home</button></NavLink>
              </div>
              <div>
                  <SearchBar/>
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
                    <input type="text" placeholder="Healthy food level of your recipe" name={"healtyScore"} value={input.healtyScore} onChange={e=>handleChange(e)}/>
                  </div>
                  <div>
                    <label>Steps</label>
                    <input type="text" placeholder="Tell us the step by step of your recipe here" name={"steps"} value={input.steps} onChange={e=>handleChange(e)}/>
                  {/* </div>
                  <input type={"submit"} value={"Add Step"}/>
                  <div> */}
                      <h5>Diet Types</h5>
                      <p>Select what type of diets your recipe can belong to.</p>
                      <p>Your recipe can belong to one or more types of diets.</p>
                    
                    <label>hacer esto con un map para cada dieta</label>
                    <input type="checkbox" />
                  </div>
                  <input type={"submit"} value={"Add Recipe"}/>
                  <button type={"reset"} onClick={e=>handleReset(e)}>Reset Form</button>
              </form>

            </div>
        </>
    )
}