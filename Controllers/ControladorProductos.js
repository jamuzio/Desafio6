const contenedor = require('../class/Contenedor.js')

const Productos = new contenedor()

const ControladorProductos = {
    AllProd: async (req, res) => {
        let AllProd = await Productos.getAll()
        res.send(AllProd)
    },
    ProdByID: async (req, res) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await Productos.getById(id);
            res.json(ProductoBuscado)
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    AddNewProd: async (req, res) => {
        const NewProduct = req.body
        try {
            if (NewProduct.hasOwnProperty("TITLE") && 
                NewProduct.hasOwnProperty("PRICE") && 
                NewProduct.hasOwnProperty("THUMBNAIL")){
                    await Productos.save(NewProduct.TITLE, NewProduct.PRICE, NewProduct.THUMBNAIL);
            } else {
                const error = new Error('El formato no es correcto')
                error.tipo = 'bad format'
                throw error
            }
            res.status(201)
        } catch (error) {
            if (error.tipo === 'bad format'){
                res.status(406).json({ error: error.message })
            }else if (error.tipo === 'duplicated product'){
                res.status(409).json({ error: error.message })
            }else {
                res.status(500).json({ error: error.message })
            }

        }
    },
    UpdateProd: async (req, res) => {
        const id = req.params.id
        const UpdateData = req.body
        try {
            if (UpdateData.hasOwnProperty("TITLE") && 
                UpdateData.hasOwnProperty("PRICE") && 
                UpdateData.hasOwnProperty("THUMBNAIL")){
                    await Productos.UpdateProd(id, UpdateData.TITLE, UpdateData.PRICE, UpdateData.THUMBNAIL);
            } else {
                const error = new Error('El formato no es correcto')
                error.tipo = 'bad format'
                throw error
            }
            res.status(202).json(UpdateData)
        } catch (error) {
            if (error.tipo === 'bad format'){
                res.status(406).json({ error: error.message })
            }else {
                res.status(500).json({ error: error.message })
            }

        }
    },
    DeleteProdByID: async (req, res) => {
        const id = req.params.id
        try {
            await Productos.deleteById(id);
            res.status(202).send('Producto Eliminado con exito')
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }

}

const FunctionsProductCtrl = {
    AllProd: async () => {
        let AllProd = await Productos.getAll()
        return AllProd
    },
    AddNewProd: async NewProduct => {
        try {
            if (NewProduct.hasOwnProperty("TITLE") && 
                NewProduct.hasOwnProperty("PRICE") && 
                NewProduct.hasOwnProperty("THUMBNAIL")&&
                NewProduct.TITLE.length > 0 &&
                NewProduct.PRICE.length > 0 &&
                NewProduct.THUMBNAIL.length > 0){
                    await Productos.save(NewProduct.TITLE, NewProduct.PRICE, NewProduct.THUMBNAIL);
            } else {
                const error = new Error('El formato no es correcto')
                error.tipo = 'bad format'
                throw error
            }
            return "Product added"
        } catch (error) {
            throw error
           /* if (error.tipo === 'bad format'){
                res.status(406).json({ error: error.message })
            }else if (error.tipo === 'duplicated product'){
                res.status(409).json({ error: error.message })
            }else {
                res.status(500).json({ error: error.message })
            }*/
        }
    }
}

module.exports = { ControladorProductos, FunctionsProductCtrl }