const { FunctionsProductCtrl } = require('./ControladorProductos')
const Classmensajes = require('../class/Mensajes.js')

const Mensajes = new Classmensajes()

async function eventCnx(socket, io) {
    console.log("Nueva conexion iniciada")
    await Prod_Emit(socket)
    await Msj_emit(io)
    socket.on('NewProd', NewProd => eventoNewPrdo(socket, io, NewProd))
    socket.on('mensaje', mensaje => eventoMensajeController(socket, io, mensaje))
}

async function eventoNewPrdo(socket, io, NewProd){
    try{
        await FunctionsProductCtrl.AddNewProd(NewProd)
        socket.emit('NewProd_res', "Producto Añadido Exitosamente")
        await Prod_EmitToAll(io)
    }
    catch(error){
        if (error.tipo === 'bad format'){
            socket.emit('NewProd_res', "El Formato no es Correcto")
        }else if (error.tipo === 'duplicated product'){
            socket.emit('NewProd_res', "Producto Duplicado")
        }else {
            socket.emit('NewProd_res', "Error desconocido")
        }
    }
}

async function eventoMensajeController(socket, io, mensaje) {
    try{
        await Mensajes.save(mensaje.autor, mensaje.texto)
        socket.emit('Msj_res', "")
    }
    catch(error){
        if (error.tipo === 'no autor data'){
            socket.emit('Msj_res', "Debe ingresar un Email para usar el chat")
        }else {
            socket.emit('Msj_res', "Error en servidor, por favor intente nuevamente")
        }
    }

    await Msj_emit(io)
}

async function Msj_emit(io) {
    const mensajes_all = await Mensajes.getAll()
    //console.log(mensajes_all)
    io.sockets.emit('mensajes', {mensajes_all})
}

async function Prod_Emit(socket) {
    const AllProd = await FunctionsProductCtrl.AllProd()
    const data = {
        AllProd,
        hayProductos: Boolean(AllProd.length > 0)
    }
    socket.emit('Products', data)
}

async function Prod_EmitToAll(io) {
    const AllProd = await FunctionsProductCtrl.AllProd()
    const data = {
        AllProd,
        hayProductos: Boolean(AllProd.length > 0)
    }
    io.sockets.emit('Products', data)
}
module.exports = eventCnx