var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var messages = [{
    id: 1,
    text: "Hola soy un mensage",
    author: "Santiago"
}];

app.use(express.static('public'));

app.get('/', function(req, res){
    res.status(200).send('Hola mundo!!!');
});

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con socket');
    socket.emit("messages", messages);
    socket.on('new-message', function(data){
        messages.push(data);
        io.sockets.emit('messages', messages);
    });
    socket.on('char:typing', function(data){
        socket.broadcast.emit('char:typing', data);
    });
});

server.listen(8080, function() {
    console.log('Servidor corriendo en http://localhost:8080');
});