const { io } = require('../index');

// Mensajes de sockets
// cliente una persona que se acaba de conectar al socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.on('disconnect', () => { 
        console.log('Cliente desconectado ');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje ', payload);
        io.emit('mensaje', { admin: 'nuevo mensaje'});
    });
});
