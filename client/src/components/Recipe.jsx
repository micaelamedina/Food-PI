import React from "react";
import { NavLink } from "react-router-dom";

//en este componente va a estar el detalle de una receta (para la pantalla principal, solo con algunos datos.)

// export class Recipe extends React.Component() {
//     render() {
//         const {id, name, image, diet} = this.props;
//         return (
//             <>
//             <NavLink to={`/recipes/${id}`}><h3>Name: {name}</h3></NavLink>
//             <h5>Diet: {diet}</h5>
//             <img src={image} alt="Img Recipe" />
//             </>
//         );
//     };
// };

export function Recipe({id, name, diets, image}){
    return(
        <>
            <NavLink to={`/recipes/${id}`}><h3>Name: {name}</h3></NavLink>
            <h5>Diets: {diets.map(e=>`${e} `)}</h5>
            <img src={image} alt="Img Recipe" />
        </>
    )
}
