/*
GET /types

-Obtiene todos los tipos de dietas posibles.
-Si aun no existe ninguno, precargar con la base de datos indicadas por la api. VER
*/
const express = require('express');
const router = express.Router();
const {getTypeDiet} = require('./models/model');

router.get('/', async (req, res) => {
   res.json(await getTypeDiet());
})

module.exports = router;

