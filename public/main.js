var socket = io.connect('http://localhost:8080', { 'forceNew': true });

var username = document.getElementById('username');
var texto = document.getElementById('texto');

socket.on("messages", function(data){
    document.getElementById('actions').innerHTML = "";
    render(data);
});

socket.on('char:typing', function(data){
    document.getElementById('actions').innerHTML = data;
});

function render(data) {
    var html = data.map(function(elem, index){
        return(`<div>
                    <strong>${elem.author}</strong>
                    <em>${elem.text}</em>
                </div>`);
    }).join(" ");
    
    document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value
    };
    document.getElementById('username').value = "";
    document.getElementById('texto').value = "";

    socket.emit('new-message', payload);
    
    return false;
}

texto.addEventListener('keypress', function () {
    socket.emit('char:typing', `${username.value} is typing.....`);
});

