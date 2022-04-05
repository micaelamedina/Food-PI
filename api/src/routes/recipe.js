const {Router} = require('express');
const router = Router();
const {createRecipe, orderSortName, getAllDb, getAllAPI } = require('./models/model');

router.post('/', async (req, res) => {
    try {
        const { name, summary, image, score, healthScore, steps, diets } = req.body;
        if(!name || !summary || !image || !score || !healthScore || !steps || !diets) {
            res.status(404).send({msg: 'Missing Data'});
        } else {
            await createRecipe({name, summary, score, healthScore, steps, image, diets});
            res.status(200).send('Recipe created');
        };
    } catch (error) {
        res.status(404).send(`Error ${res.statusCode} ${error}`);
    };
});

router.get('/order/:orderType', async (req, res) => {
    try {
        const {orderType} = req.params;
        if(orderType) {
            const recipeOrder = await orderSortName(orderType)
            return res.json(recipeOrder)
        } else {
            return res.send('Order type is required')
        }
    } catch (error) {
        console.log(error);
    };
});

router.get('/filter/:nameUbication', async (req, res) => {
    try {
        const {nameUbication} = req.params;
        if(nameUbication) {
            if(nameUbication === 'db') {
                const dataDb = await getAllDb();
                if(dataDb) {
                    res.status(200).json(dataDb)
                } else {
                    'No hay datos en la db.'
                };
            } else if (nameUbication === 'api') {
                const dataApi = await getAllAPI();
                if(dataApi) {
                    res.status(200).json(dataApi)
                } else {
                    'No hay datos en la api.'
                };
            };
        } else {
            return 'Name ubication is required.'
        };
    } catch (error) {
        console.log(error);
    };
});
 
module.exports = router;
