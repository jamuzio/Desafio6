const contenedor = require('../class/Contenedor.js')

const Productos = new contenedor()

const WebController = {
    AddNewProd: async (req, res) => {
        res.render('ProdManag', [])
    },
    ProdDisplay:async (req, res) => {
        let AllProd = await Productos.getAll()
        const data = {
            AllProd,
            hayProductos: Boolean(AllProd.length > 0)
        }
        res.render('ProductsDisplay', data)
    }
}

module.exports = { WebController }