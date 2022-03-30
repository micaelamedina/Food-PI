const {Router} = require('express');
const router = Router();
const {getRecipeByName, getRecipeById} = require('./models/model');

router.get('/', async (req, res) => {
    const {name} = req.query;
    const allDatos = await getRecipeByName(name);
    res.json(allDatos);
})

router.get('/:idRecipe', async (req, res) => {
    const {idRecipe} = req.params;
    const allData = await getRecipeById(idRecipe);
    res.json(allData);
})

module.exports = router;