const socket = require('socket.io');
var _socket;

function init(server){
    // socket.io
    _socket = socket(server);
    _socket.on('connection', function (socket) {
        console.log('info', 'a user connected');
    });
    return _socket;
}

module.exports = {
    init : init,
    get socket(){
        return _socket;
    }
}