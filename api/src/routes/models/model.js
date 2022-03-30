require('dotenv').config();
const {API_KEY, API_KEY_1, API_KEY_2, API_KEY_3, API_KEY_4, API_KEY_5, API_KEY_6} = process.env;
const axios = require('axios');
const {Recipe, Diet} = require('../../db');

//Info de la api.
const getAllAPI = async () => {
        const dataApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_3}&number=10`);
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
                cuisines: api.cuisines.map(e=>e), //tipo de comida ej: tailandesa.
                dishTypes: api.dishTypes, //tipo de plato: ej guarnicion
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
const getAllTypesDiets = async () => {
    const dataAPI = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?addRecipeInformation=true&apiKey=${API_KEY_6}&number=50`);
    const dietFilter = await dataAPI.data.results.map(ob => ob.diets.map(e=>e));
    let dietComplete = [];
    for (let i = 0; i < dietFilter.length; i++) {
        if(dietFilter[i].length > 1) {
            for (let j = 0; j < dietFilter[i].length; j++) {
                dietComplete.push(dietFilter[i][j])
            };
        } else {
            dietComplete.push(dietFilter[i][0]);
        };
    };
    dietComplete.push('ketogenic', 'vegetarian');
    const set = new Set(dietComplete);
    dietComplete = [...set];
    dietComplete = dietComplete.filter(e=>e !== null && e !== undefined);
    return dietComplete;
};

const getTypeDiet = async () => {
    const typeDiets = await getAllTypesDiets();
    typeDiets.forEach(diet => {
        Diet.findOrCreate({
            where: { name: diet },
          })
    });
    const allDiets = await Diet.findAll();
    return allDiets;
}

//Creación de nueva receta.
const createRecipe = async (name, summary, image, score, healthScore, steps, diets) => {
    const newRecipe = await Recipe.create({
        name,
        summary,
        image,
        score,
        healthScore,
        steps,
    });
    const dietDb = await Diet.findAll({
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