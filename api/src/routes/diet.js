const {Router} = require('express');
const router = Router();
const {filterRecipesByDiets} = require('./models/model');


router.get('/:diet', async (req, res) => {
    try {
        const {diet} = req.params;
        const recipes = await filterRecipesByDiets(diet);
        if(Array.isArray(recipes)) {
            res.status(200).json(recipes);
        } else {
            res.status(404).send(recipes);
        };
    } catch (error) {
        res.status(404).send(`Error ${res.statusCode} ${error}`);
    };
});
module.exports = router;