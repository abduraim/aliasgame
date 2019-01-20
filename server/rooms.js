var rooms = [];

// Модель Игры
function Player(socketId) {

}

// Создаем Комнату
exports.createRoom = function (room_name) {
    rooms.push({'room': room_name});
    return true;
};

// Возвращаем список всех комнат
exports.getAllRooms = function () {
    return rooms;
};