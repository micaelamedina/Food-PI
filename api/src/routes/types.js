const express = require('express');
const router = express.Router();
const {getTypeDiet} = require('./models/model');

router.get('/', async (req, res) => {
   const allDiets = await getTypeDiet();
   try {
      res.status(200).json(allDiets);
   } catch (error) {
      res.status(404).send('No se pudieron obtener las recetas ' + error);
   };
});

module.exports = router;

