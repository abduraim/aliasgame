var players = [];

// Модель Игрока
function Player(socketId) {
    this.socketId = socketId;
    this.name = '';
    // this.getId = function () {
    //     console.log(this.socketId);
    // };
}

// Добавление нового Игрока
exports.addToGame = function (socket) {
    players.push(new Player(socket.id));
};

// Присваиваем ID Сокета Имя Игрока
exports.registerName = function (socketId, name) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            players[i].name = name;
            return true;
        }
    }
};

// Удаления Игрока из Массива
exports.removeFromGame = function (socketId) {
    for (var i = 0; i < players.length; i++) {
        if (players[i].socketId == socketId) {
            console.log('remove Player - ', socketId);
            players.splice(i, 1);
        }
    }
};
