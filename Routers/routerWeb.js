const express = require('express')
const { WebController } = require('../Controllers/WebController.js')

const routerWeb = express.Router()


routerWeb.get('/', WebController.AddNewProd)
routerWeb.get('/productos', WebController.ProdDisplay)

module.exports = routerWeb 