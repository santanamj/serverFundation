const bairroController = require ('./../controllers/bairro');
const express = require ('express');

var api = express.Router();

api.post('/newBairro', bairroController.newBairro);
api.get('/getBairro', bairroController.getBairro);
api.get('/oneBairros/:id', bairroController.oneBairros);
api.get('/ProductBairro',   bairroController.ProductBairro);
module.exports = api;