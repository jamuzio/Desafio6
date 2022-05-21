const { Router } = require('express')
const { ControladorProductos } = require('../Controllers/ControladorProductos.js')




const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', ControladorProductos.AddNewProd)
routerProductos.put('/:id', ControladorProductos.UpdateProd)
routerProductos.delete('/:id', ControladorProductos.DeleteProdByID)


module.exports = routerProductos