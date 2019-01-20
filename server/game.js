var player = require('../server/player'); // Подключаем модель игрока
var rooms = require('../server/rooms'); // Подключаем модели игр


exports.init = function (sio) {
    io = sio;
    io.on('connection', function (socket) {

        // Добавление нового Игрока
        player.addToGame(socket);

        // Пользователь ушел с сайта
        socket.on('disconnect', function (data) {
            player.removeFromGame(socket.id);
        });

        // Пришло Имя Игрока
        socket.on('sendName', function (name) {
            if (player.registerName(socket.id, name)) {
                socket.emit('playerNameOk');
            } else {
                socket.emit('error', 'Player name registration fail');
            }
        });

        // Пришел запрос на получения Комнат
        socket.on('getRooms', function () {
            socket.emit('refreshRooms', rooms.getAllRooms());
        });

        // Пришло новое Название Комнаты
        socket.on('sendRoom', function (roomName) {
            if (rooms.createRoom(roomName)) {
                io.emit('refreshRooms', rooms.getAllRooms());
            } else {
                socket.emit('error', 'Create room error');
            }
        });

        // Игрок выбрал Комнату
        socket.on('joinToRoom', function (roomName) {
            socket.join(roomName);
            io.to(roomName).emit('message', 'Hallo!!');
        })

    });

};