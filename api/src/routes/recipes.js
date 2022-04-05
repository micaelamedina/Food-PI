const {Router} = require('express');
const router = Router();
const {getRecipeByName, getRecipeById, getAll} = require('./models/model');

// router.get('/', async (req, res) => {
//     const {name} = req.query;
//     const allDatos = await getRecipeByName(name);
//     res.json(allDatos);
// });
router.get('/', async (req, res) => {
    try {
        const {name} = req.query;
        if(name) {
            const recipeByName = await getRecipeByName(name);
            res.status(200).json(recipeByName);
        } else {
            const allData = await getAll();
            res.status(200).json(allData);
        };
    } catch (error) {
        res.status(404).send(`Error ${res.statusCode} ${error}`);
    };
});
    
router.get('/:idRecipe', async (req, res) => {
    try {
        const {idRecipe} = req.params;
        const allData = await getRecipeById(idRecipe);
        res.json(allData);
    } catch (error) {
        res.status(404).send(`Error ${res.statusCode} ${error}`);
    };
});

module.exports = router;