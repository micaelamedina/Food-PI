const {Router} = require('express');
const router = Router();
const {createRecipe} = require('./models/model');

router.post('/', async (req, res) => {
    try {
        const { name, summary, image, score, healthScore, steps, diets } = req.body;
        if(!name || !summary || !score || !healthScore || !steps || !diets) {
            res.status(404).send({msg: 'Missing Data'});
        } else {
            await createRecipe({name, summary, score, healthScore, steps, image, diets});
            res.status(200).send('Recipe created');
        };
    } catch (error) {
        res.status(404).send(`Error ${res.statusCode} ${error}`);
    };
});

module.exports = router;
