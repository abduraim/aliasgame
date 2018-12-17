var players = [];

// Модель Игрока
function Player(socketId) {
    this.socketId = socketId;
    this.name = '';

    this.getId = function () {
        console.log(this.socketId);
    };
}

exports.addToGame = function (socket) {
    players.push(new Player(socket.id));
    console.log('add new player, id = ' + socket.id);
};


exports.registerName = function (socketId, name) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            players[i].name = name;
        }
    }
};

exports.getAllPlayers = function () {

    data = [];
    for (var i = 0; i < players.length; i++) {
        data.push({'name': players[i].name, 'id': players[i].socketId})
    }
    return data;
};

exports.removeFromGame = function (socketId) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            console.log('remove Player - ', socketId);
            players.splice(i, 1);
        }
    }
};