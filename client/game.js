var socket;

socket = io.connect('http://localhost:3000');

socket.on('connect', () => {

    socket.on('new', function (id) {
        console.log('our id is ' + id);
        $('#submit_name').show();
        $('#submit_name').on('click', function (event) {
            event.preventDefault();
            console.log('click');
            socket.emit('register_name', $('input[name=name]').val());
        });
        socket.on('show_players', function (data) {
            updatePlayersList(data);
        });
    });

    // Обновление списка Игроков
    var updatePlayersList = function (data) {
        $("#players").empty();
        for (var i = 0; i < data.length; i++) {
            if (data[i].name) {
                $('#players').append('<li id="' + data[i].id+ '">' + data[i].name + '</li>');
            }
        }

    };
    // socket.emit('start', socket.id);
    // socket.on('playerStart', function (servPlayer) {
    //     player = new Player(servPlayer.posX, servPlayer.posY, servPlayer.radiusSize, servPlayer.velocity, servPlayer.socketId);
    //     zoom = player.zoom;
    //     loop();         // start drawing
    // });
});


$(document).ready(function () {
    $('#create_game').on('click', function (event) {
        console.log('create game click');
    });
});