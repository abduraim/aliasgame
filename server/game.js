var player = require('../server/player'); // Подключаем модель игрока

exports.init = function (sio) {
    io = sio;
    io.on('connection', function (socket) {
        player.addToGame(socket);
        io.emit('new', socket.id);
        socket.on('register_name', function (name) {
            player.registerName(socket.id, name);
            io.emit('show_players', player.getAllPlayers());
        });
        socket.on('disconnect', function (data) {
            player.removeFromGame(socket.id);
            io.emit('show_players', player.getAllPlayers());
        });
        io.emit('show_players', player.getAllPlayers());
    });

};