const express = require('express')
const routerProductos = require('./Routers/routerProductos')
const routerWeb = require('./Routers/routerWeb')
const { engine } = require('express-handlebars')
const { Server: Socketserver } = require('socket.io')
const { Server: HttpServer } = require('http')
const eventCnx = require('./Controllers/socketController.js')


const app = express()
const httpServer = new HttpServer(app)
const io = new Socketserver(httpServer)
const PORT = 8080

app.use(express.static('Public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/', routerWeb)

io.on('connection', socket => eventCnx(socket, io))

const server = httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${server.address().port}`)
})

/* const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
*/