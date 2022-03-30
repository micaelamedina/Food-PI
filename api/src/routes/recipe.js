const {Router} = require('express');
const router = Router();
const {createRecipe} = require('./models/model');

router.post('/', async (req, res) => {
    const { name, summary, image, score, healthScore, steps, diets } = req.body;
    if(!name || !summary || !image || !score || !healthScore || !steps || !diets) {
        return {msg: 'Faltan datos.'};
    } else {
        await createRecipe(name, summary, image, score, healthScore, steps, diets);
        res.send('recipe created');
    }
})

module.exports = router;
