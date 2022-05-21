const fs = require('fs');

const File = './DataBase/Mensajes.json'

class Mensajes {
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
                    console.log('Se creo el archivo Msjs')
                }
                catch{
                    console.log('No se pudo crear el archivo Msjs')
                    console.log(error)
                }
               } else {
                    console.log('No se pudo leer el archivo Msjs')
                    console.log(error)
               }
        }
    }

    async save(autor, mensaje){
        if(autor){
            this.Objects.push({
                DATE: `${Getdate()}`,
                AUTOR: autor,
                MENSAJE: mensaje
            })
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
            }
            catch(error){
                console.log('Error al agregar un mensaje en la base')
                throw error
            }
        }
        else{
            const error = new Error('Mensaje sin autor')
            error.tipo = 'no autor data'
            throw error
        }
    }

    async getAll(){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            return this.Objects
        }
        catch(error){
            console.log('No se pudo leer el archivo Msj')
            console.log(error)
        }
    }
}

function Getdate () {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}

module.exports = Mensajes