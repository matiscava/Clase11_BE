const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const { getMessages, saveMessage } = require('./models/messages')


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);



app.use(express.static('./public'))

app.get('/', (req,res)=>{
    res.sendFile('index.html', {root: __dirname})
});

//connection siempre tiene que estar en ingles
io.on('connection', (socket)=>{
    console.log('Nuevo cliente conectado!!');
    
    const messages = getMessages();
    socket.emit('messages', messages )
    
    socket.on('new-message', (message) =>{
        saveMessage(message);
        
        const messages = getMessages();
        io.sockets.emit('messages', messages )        
    })

    // socket.emit('mensaje', 'Este es un mensaje desde el servidor')
    
    // // socket.emit('mensajes', mensajes);
    
    // socket.on('notificacion', (data) =>{
        //     console.log(data);
        //     // mensajes.push({socketid: socket.id, mensaje: data})
        //     io.sockets.emit('mensajes', data);
        // })
})
    
const PORT = 8080;
const connectedServer = httpServer.listen(PORT, ()=> {
    console.log(`Server funcionando en el puerto ${PORT}`)
});

connectedServer.on('error', error => console.log(`Erro en servidro ${error}`));