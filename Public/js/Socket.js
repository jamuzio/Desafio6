const socket = io()

///// control de socket //////

socket.on('Products', (datos) => {
    console.log(datos)
    DisplayProd(datos)
})

socket.on('NewProd_res', async (Respuesta) => { 
    const divStatus = document.getElementById('Status')
    buscarPlantilla('Templates/info.hbs').then(plantilla => {
        console.log(Respuesta)
        const generarHtml = Handlebars.compile(plantilla)
        divStatus.innerHTML = generarHtml({Respuesta})
    })
})

socket.on('mensajes', (mensajes) => {
    console.log(mensajes)
    mostrarMensajes(mensajes)
})

socket.on('Msj_res', (Respuesta) =>{
    const divMsj_info = document.getElementById('Msj_info')
    console.log(Respuesta)
    divMsj_info.innerHTML = Respuesta
})

/////  funciones axuliares /////////

async function DisplayProd(datos) {
    const divProductos = document.getElementById('Productos')
    buscarPlantilla('Templates/Productos.hbs').then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla)
        divProductos.innerHTML = generarHtml(datos)
    })
}

async function mostrarMensajes(mensajes) {
    const divMensajes = document.getElementById('Mensajes')
    buscarPlantilla('Templates/chat.hbs').then(plantilla => {
        const generarHtml = Handlebars.compile(plantilla)
        console.log(mensajes)
        divMensajes.innerHTML = generarHtml(mensajes)
    })
}

function buscarPlantilla(url) {
    return fetch(url).then(res => res.text())
}

/////  control de botones //////

const btn_newProd = document.getElementById('btn_newProd')
btn_newProd.addEventListener('click', event => {
    const TITLE = document.getElementById('TITLE').value
    const PRICE = document.getElementById('PRICE').value
    const THUMBNAIL = document.getElementById('THUMBNAIL').value
    socket.emit('NewProd', { TITLE, PRICE, THUMBNAIL })
})

const btn = document.getElementById('btn_enviar')
btn.addEventListener('click', event => {
    const autor = document.getElementById('inputAutor').value
    const texto = document.getElementById('inputTexto').value
    socket.emit('mensaje', { autor, texto })
})

///// Axuliar HBS ///////

Handlebars.registerHelper('ifCond', function(v1, v2, options) { //funcion auxiliar para hbs de info.hbs
    if(v1 === v2) {
      return options.fn(this);
    }
    return options.inverse(this);
  });