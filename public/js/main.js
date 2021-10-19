const socket = io.connect();
const renderMessages = (messages) =>{
    messages.reverse();
    const html = messages.map((message)=>{
        return(`
            <div>
                <strong>${message.author}</strong>:
                <em>${message.text}</em>
            </div>
        `);
    }).join(' ');
    document.getElementById('messages').innerHTML = html;
}
const addMessage = (e) => {
    e.preventDefault();

    const mensaje = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    }
    socket.emit('new-message', mensaje);
    document.getElementById('texto').value = '';
    return false;
}

const form = document.getElementById('form');
form.addEventListener('submit',addMessage);
// socket.on('mensaje', (data)=>{
//     console.log(data);
//     socket.emit('notificacion', 'Mensaje recibido exitosamente');
// })

// socket.on('mensajes', (data)=>{
//     console.log(data);
// })

socket.on('messages', (data)=>{
    console.log(data);
    renderMessages(data);
})

