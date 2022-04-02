import React from "react";
import SearchBar from "./SearchBar";

export default function RecipeDetail(props) {
    const {name, image, diet, summary, score, healtyScore, steps} = props;
   // const params = props.match.params.idRecipe
    return(
        <>
            <div>
                  <SearchBar/>
            </div>
            <h3>Name: {name}</h3>
            <img src={image} alt="Img Recipe" />
            <h5>Diet: {diet}</h5>
            <h5>Score: {score}</h5>
            <h5>Healty Score: {healtyScore}</h5>
            <h5>Summary:</h5>
            <span>{summary}</span>
            <h5>Steps:</h5>
            <span>{steps}</span>
        </>
    );
};

