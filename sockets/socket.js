const { io } = require('../index');
const Band = require('../models/Band');

const Bands = require('../models/Bands');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Filoxera'));
bands.addBand(new Band('Viento en Contra'));
bands.addBand(new Band('Bohemia Suburbana'));
// Mensajes de sockets
// cliente una persona que se acaba de conectar al socket
io.on('connection', client => {
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('Cliente desconectado ');
    });

    client.on('mensaje', (payload) => {
        console.log('mensaje ', payload);
        io.emit('mensaje', { admin: 'nuevo mensaje'});
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });
    

    client.on('emitir-mensaje', ( payload ) => {
        // io.emit('nuevo-mensaje', payload); // emit a todos
        client.broadcast.emit('nuevo-mensaje', payload) // emite a todos mentos el que lo emitio
    })
});
