require('dotenv').config();
const {API_KEY, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6, API_KEY_7} = process.env;
const axios = require('axios');
const {Recipe, Diet} = require('../../db');

//Info de la api.
const getAllAPI = async () => {
        const dataApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_6}&number=10`);
        const filterApi = await dataApi.data.results.map(api => {
            return {
                id: api.id,
                name: api.title,
                summary: api.summary,
                image: api.image,
                score: api.spoonacularScore,
                healthScore: api.healthScore,
                steps: api.analyzedInstructions.map(e=>e), //analyzed es un array con una sola posicion, dentro tiene un objeto, donde una de sus propiedades es step, un array de pasos.
                diets: api.diets.map(e=>e)
            };
        });
        return filterApi;  
};

// const getAllAPI = () => {
//     return axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_6}&number=10`)
//                 .then(r=>r.data.results.map(api => {
//                     return {
//                         id: api.id,
//                         name: api.title,
//                         summary: api.summary,
//                         image: api.image,
//                         score: api.spoonacularScore,
//                         healthScore: api.healthScore,
//                         steps: api.analyzedInstructions.map(e=>e), //analyzed es un array con una sola posicion, dentro tiene un objeto, donde una de sus propiedades es step, un array de pasos.
//                         diets: api.diets.map(e=>e)
//                     }
//                 })).then(r=>r)
// };

//Info de la db.
const getAllDb = async () => {
        return await Recipe.findAll({
            include: {
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes: [],
                }
            }
        });  
};

//Info de la API y Db.
const getAll = async() => {
   const dataAPI = await getAllAPI();
   const dataDb = await getAllDb();
   const allData = dataAPI.concat(dataDb);
   return allData;
};

// const getAll = () => {
//     return getAllAPI().then(r=>r.concat(getAllDb().then(rta => rta))).then(r=>r)
// };

//Busqueda de recetas por nombre.
const getRecipeByName = async (name) => {
    const allData = await getAll();
    if(name) {
        const nameFilter = allData.filter(n => n.name.toLowerCase().includes(name.toLowerCase()));
        if(nameFilter.length) {
            return nameFilter;
        } else {
           return {msg: 'The name entered is not a recipe'};
        };
    } else {
        return {msg: 'Recipe name is required'};
    };
};

//Busqueda de recetas por id. 
//Esta función sirve para validar el ID recibido, de esa manera determinamos si es de la API o de la BD.
const validateId = (id) => { 
    if(id.length < 36) { //El ID de la DB es aleatorio de 36 digitos, si es menor a esa longitud, no es Id de DB.
        id = id.replace(/\D/g, ''); //Saca los caracteres no numericos por las dudas de que haya alguno erroneo.
        id = Number(id); //Pasa el id a numero y lo devuelve. (Por query se recibe como string)
        return id;
    } else {
        return id; //Si la longitud no es menor a 36, se devuelve el mismo id.
    };
};

//Obtener recetas por id.
const getRecipeById = async (id) => {
    if(id) {
        id = validateId(id);
        const allData = await getAll();
        const idFilter = allData.find(e => e.id === id);
        if(idFilter) {
            return idFilter;
        } else {
            return {msg: 'The id entered is not a recipe valid'};
        };
    } else {
        return {msg: 'The id is required'}; 
    };
};

//Tipos de dietas:
//Obtener todos los tipos de dietas posibles.

// const getAllTypesDiets = async () => {
//     const allRecipes = await getAll();
//     let dietFilter = allRecipes.map(r=>r.diets);
//     let dietComplete = ["lacto vegetarian", "ovo vegetarian", "vegetarian", "ketogenic", "pescetarian","paleo", "low fodmap"];
//     dietFilter.forEach(d => {
//         if(d.length >= 2) {
//             d.forEach(e=> dietComplete.push(e));
//         } else if(d.length === 1) {
//             dietComplete.push(d[0]);
//         };
//     });
//     let set = new Set(dietComplete);
//     dietComplete = [...set];
//     dietComplete = dietComplete.filter(e=>e !== null && e !== undefined && e !== "");
//     dietComplete = dietComplete.map((diet) => {
//         return {name: diet}
//     });
//     return dietComplete; 
// };

const getTypeDiet = async () => {
    let typeDiets = [
        "gluten free",
        "ketogenic",
        "vegetarian",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "paleolithic",
        "primal",
        "fodmap friendly",
        "dairy free",
        "whole 30",
        "pescetarian",
        "paleo",
        "low fodmap",
        "lacto vegetarian",
        "ovo vegetarian"
      ];
    typeDiets.forEach(diet => {
        Diet.findOrCreate({
            where: { name: diet },
          })
    });
    let allDiets = await Diet.findAll();
    if(allDiets) {
        return allDiets;
    } else {
        return {msg: "No hay dietas"}
    };
};

//este funciona pero si me agregan algo desde la Db no lo toma en cuenta.
// const getTypeDiet = async () => {
//     const dietsDb = await Diet.findAll();
//     if(!dietsDb.length) {
//         let dietsAll = await getAllTypesDiets();
//         dietsAll = dietsAll.map((diet) => {
//             return {name: diet} //[{name:vegan}, {name:ketogenic}]
//         });
//         await Diet.bulkCreate(dietsAll);
//         const allDietsDb = await Diet.findAll();
//         return allDietsDb;
//     } else {
//         return dietsDb;
//     };
// };

//Creación de nueva receta.
////diets = ['vegan','vegetarian']
const createRecipe = async ({name, summary, score, healthScore, steps, image, diets}) => {
    const newRecipe = await Recipe.create({
        name,
        summary,
        score,
        healthScore,
        steps,
        image
    });
        let dietDb = await Diet.findAll({
            where: {name: diets}
        });
       newRecipe.addDiet(dietDb);
};

module.exports = {
    getAll,
    getRecipeByName,
    getRecipeById,
    getTypeDiet,
    createRecipe,
};