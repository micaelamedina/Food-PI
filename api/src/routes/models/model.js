require('dotenv').config();
const {API_KEY, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6} = process.env;
const axios = require('axios');
const {Recipe, Diet} = require('../../db');

//Info de la api.
const getAllAPI = async () => {
        const dataApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_4}&number=50`);
        const filterApi = await dataApi.data.results.map(api => {
            return {
                id: api.id,
                name: api.title, //title/name
                summary: api.summary, //detalle
                image: api.image, //url image.
                score: api.spoonacularScore, //puntaje
                healthScore: api.healthScore, //nivel saludable
                steps: api.analyzedInstructions.map(e=>e), //analyzed es un array con una sola posicion, dentro tiene un objeto, donde una de sus propiedades es step, un array de pasos.
                diets: api.diets.map(e=>e), //tipos de dietas.
                // cuisines: api.cuisines.map(e=>e), //tipo de comida ej: tailandesa.
                // dishTypes: api.dishTypes, //tipo de plato: ej guarnicion
            };
        });
        return filterApi;  
};

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
//Esta gestión sirve para validar el ID recibido, de esa manera determinamos si es de la API o de la BD.
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
//En los primeros 100 request de esta API no hay recetas que incluyan la dieta ketogenic y/o vegetarian, por eso son pusheadas manualmente a dietComplete. En caso de modificarse la API y que en los primeros 100 request se incluya alguna de estas dietas, no habrá duplicados ya que el set no los permite.
//Tambien se podría tener pre-cargadas todos los tipos de dieta que hay en la documentación de la API al iniciar dietComplete, recorrer la info obtenida de la API para tener en cuenta si hay incoporaciones de nuevos tipos de dieta, y que se unifiquen al momento de crear el set.
// const getAllTypesDiets = async () => {
//     const dataAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_6}&number=50`);
//     let dietFilter = await dataAPI.data.results.map(ob => ob.diets);
//     let dietComplete = ['lacto vegetarian', 'ovo vegetarian', 'vegetarian', 'ketogenic'];
//     for (let i = 0; i < dietFilter.length; i++) {
//         if(dietFilter[i].length >= 2) {
//             for (let j = 0; j <= dietFilter[i].length; j++) {
//                 dietComplete.push(dietFilter[i][j])
//             };
//         } else if(dietFilter[i].length === 1) {
//             dietComplete.push(dietFilter[i][0]);
//         };
//     };
//     const set = new Set(dietComplete);
//     dietComplete = [...set];
//     dietComplete = dietComplete.filter(e=>e !== null && e !== undefined && e !== "");
//     return dietComplete;
// };

//obtener todos los tipos de dietas posibles.
const getAllTypesDiets = async () => {
    const allRecipes = await getAll();
    let dietFilter = allRecipes.map(r=>r.diets);
    let dietComplete = ["lacto vegetarian", "ovo vegetarian", "vegetarian", "ketogenic"];
    dietFilter.forEach(d => {
        if(d.length >= 2) {
            d.forEach(e=> dietComplete.push(e));
        } else if(d.length === 1) {
            dietComplete.push(d[0]);
        };
    });
    let set = new Set(dietComplete);
    dietComplete = [...set];
    dietComplete = dietComplete.filter(e=>e !== null && e !== undefined && e !== "");
    return dietComplete;
};

//obtener y/o crear tipos de dietas.
const getTypeDiet = async () => {
    let typeDiets = await getAllTypesDiets();
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

//filtro por tipo de dieta
const filterRecipesByDiets = async (diet) => { 
    try {
        const allRecipes = await getAll();
        const allTypeDiets = await getTypeDiet();
        const dietFilter = allTypeDiets.find(d=>d.name === diet);
    if(diet) {
        if(dietFilter) {
            const recipesFilterByDiet = allRecipes.filter(r=> r.diets.find(d=>d === dietFilter.name));
            if(recipesFilterByDiet.length) {
                return recipesFilterByDiet;
            } else {
                return {msg: "There are no recipes for the type of diet entered"};
            };
        } else {
            return {msg: "The name of the diet is not valid"}
        };
    } else {
        return {msg: "Diet name is required"}
    };
    } catch (error) {
        console.log(error)
    };
};


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

// const createRecipe = async ({name, summary, score, healthScore, steps, image, diets}) => {
//     const newRecipe = await Recipe.create({
//         name,
//         summary,
//         score,
//         healthScore,
//         steps,
//         image
//     });
//     if(diets.length > 1) {
//         const dietDb = await diets.map(diet => {
//              Diet.findAll({
//                 where: {name: diet}
//             });
//         });
//         dietDb.forEach(d => {
//             newRecipe.addDiet(d);
//         });
//     } else {
//         const dietDb = await Diet.findAll({
//             where: {name: diets[0].name}
//         });
//         newRecipe.addDiet(dietDb);
//     };
// };
// typeDiets.forEach(diet => {
//     Diet.findOrCreate({
//         where: { name: diet },
//       })
// });
//orden por nombre para todas las recetas.
const orderSortName = async (orden) => {
    try {
        if(orden) {
            const allRecipes = await getAll();
            if(orden.toLowerCase() === 'nameAsc'.toLocaleLowerCase()) {
                const recipesOrderAsc = allRecipes.sort((a,b) => {
                    if (a.name > b.name) {
                        return 1;
                    };
                    if (a.name < b.name) {
                        return -1;
                    };
                    return 0;
                });
                return recipesOrderAsc;
            }
            if(orden.toLowerCase() === 'nameDesc'.toLocaleLowerCase()) {
                const recipesOrderDesc = allRecipes.sort((a,b) => {
                    if (a.name > b.name) {
                        return -1;
                    };
                    if (a.name < b.name) {
                        return 1;
                    };
                    return 0;
                });
                return recipesOrderDesc;
            };
        } else {
            return {msg: 'Order is required'}
        };
    } catch (error) {
        console.log(error)
    };    
};

//ordenamiento a-z z-a para recetas creadas en bd.
const ordenamiento = async (ordenamiento) => {
    try {
        const recetaOrdenada = await Recipe.findAll({
            order: [["name", ordenamiento]]
        });
        return recetaOrdenada;
    } catch (error) {
        console.log(error)
    }; 
};

module.exports = {
    getAll,
    getRecipeByName,
    getRecipeById,
    getTypeDiet,
    createRecipe,
    filterRecipesByDiets,
    orderSortName
};