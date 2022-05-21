const fs = require('fs');

const File = './DataBase/Productos.json'

class Contenedor {
    constructor (){
        this.Objects = []
        try{
            let FileData = fs.readFileSync(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
        }
        catch(error){
            if (error.code === 'ENOENT') {  //si es la primera ejecucion y no existe Productos.txt lo creo
                try{
                    fs.writeFileSync(File, '[]')
                    console.log('Se creo el archivo')
                }
                catch{
                    console.log('No se pudo crear el archivo. :(')
                    console.log(error)
                }
               } else {
                    console.log('No se pudo leer el archivo. :(')
                    console.log(error)
               }
        }
    }
    async save(title, price, thumbnail){
        if (!this.Objects.find(p => p.TITLE == title)){
            this.Objects.push({
                ID: `${Date.now()}`,
                TITLE: title,
                PRICE: price,
                THUMBNAIL: thumbnail
               })
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('Se agrego el producto exitosamente!')
            }
            catch(error){
                console.log('No se pudo agregar el producto al archivo. :(')
            }
        } else {
            console.log("Producto Duplicado")
            const error = new Error('Producto Duplicado')
            error.tipo = 'duplicated product'
            throw error
        }
    }

    async getById(id){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            const ProductoBuscado = this.Objects.find(p => p.ID == id)
            if (!ProductoBuscado) {
                const error = new Error('No existe el prudcto buscado')
                error.tipo = 'db not found'
                throw error
            }
            return ProductoBuscado
        }
        catch(error){
            if(error.tipo === 'db not found'){
                throw error
            } else{
                console.log('No se pudo leer el archivo. :(')
                console.log(error)
                throw error
            }
          
        }
        
    }
    async getAll(){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            return this.Objects
        }
        catch(error){
            console.log('No se pudo leer el archivo. :(')
            console.log(error)
        }
    }
    async deleteById(id){
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error('El producto no fue encotrado')
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects.splice(indiceBuscado,1)
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El producto se a eliminado exitosamente!')
            }
            catch(error){
                console.log('El producto no pudo ser eliminado. :(')
                this.Objects = BKArry
                throw error
            }
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(File, '[]')
            console.log('La lista se a limpiado con exito!')
            this.Objects = [];
        }
        catch(error){
            console.log('No se limpiar la lista. :(')
            console.log(error)
        }
    }
    async UpdateProd(id,title, price, thumbnail){
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error('El producto no fue encotrado')
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects[indiceBuscado].TITLE = title
            this.Objects[indiceBuscado].PRICE = price
            this.Objects[indiceBuscado].THUMBNAIL = thumbnail
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El producto actualizado exitosamente!')
            }
            catch(error){
                console.log('El producto no pudo ser Actulizado. :(')
                this.Objects = BKArry
                throw error
            }
        }
    }


    length(){
        return this.Objects.length
    }
}

module.exports = Contenedor