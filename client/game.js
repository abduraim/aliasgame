var socket;

socket = io.connect('http://localhost:3000');

socket.on('connect', () => {

    var $playerNameInput = $('input[name=name]');
    var $roomNameInput = $('input[name=room]');

    // Пользователь ввел свое имя
    $('#submit_name').on('click', function (event) {
        event.preventDefault();
        sendInput($playerNameInput, 'sendName');
    });
    $playerNameInput.keypress(function (event) {
        if (event.which == 13) {
            sendInput($playerNameInput, 'sendName');
        }
    });

    // Отправка Названия Игры
    $('#submit_room').on('click', function (event) {
        event.preventDefault();
        sendInput($roomNameInput, 'sendRoom');
    });
    $roomNameInput.keypress(function (event) {
        if (event.which == 13) {
            sendInput($roomNameInput, 'sendRoom');
        }
    });

    // Пользователь кликнул по названию Комнаты
    $('.created_games').on('click', '.room_item',function (event) {
        event.preventDefault();
        socket.emit('joinToRoom', $(this).data('room'));
    });










    // Если Игрок зарегал Имя движемся к Списку Игр
    socket.on('playerNameOk', function () {
        scrollToAnchor('choose_game');
        socket.emit('getRooms');
    });

    // Пришел список Комнат
    socket.on('refreshRooms', function (rooms) {
        showRoomsList(rooms, $('#created_games__list'));
    });




    // Входящие тестсовые сообщения (выводятся в консоль)
    socket.on('message', function (text) {
        console.log(text);
    });

    // Обработчик ошибок от Сервера
    socket.on('error', function (data) {
        alert(data);
        console.log(data);
    });



    // Отпавка Параметра из Inputa на Сервер (Имя Игрока, Комнаты)
    var sendInput = function ($container, eventName) {
        $container.css({'outline': 'none'});
        if ($container.val() != '') {
            socket.emit(eventName, $container.val());
            $container.val('');
        } else {
            $container.css({'outline': '1px solid red'});
        }
    };

    // Обновление списка Комнат
    var showRoomsList = function (rooms, $container) {
        $container.html('');
        if (rooms.length > 0) {
            for (var i = 0; i < rooms.length; i++) {
                if (rooms[i].room) {
                    let link = $('<a>', {href: '#', text: rooms[i].room, class: 'room_item', 'data-room': rooms[i].room}).appendTo($container);
                }
            }
        } else {
            $container.html('<p>В настоящий момент не создано ни одной игры</p>');
        }
    };

});


$(document).ready(function () {

});