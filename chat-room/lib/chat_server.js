var socketio = require('socket.io');
var io,
    guestNumber = 1,
    nickNames = {},
    nameUsed = [],
    currentRoom = {};

exports.listen = function(server){

    io = socketio.listen(server);

    // io.set('log level',1);

    //连接时处理
    io.sockets.on('connection',function(socket){
        
        guestNumber = assignGuestName(socket,guestNumber,nickNames,nameUsed);

        joinRoom(socket,'Lobby');

        //处理消息广播
        handleMessageBroadcasting(socket,nickNames);
        //处理改名请求
        handleNameChangeAttempts(socket,nickNames,nameUsed);
        //处理更换聊天室请求
        handleRoomJoining(socket);

        //处理聊天室列表请求
        socket.on('rooms',function(){
            // socket.emit('rooms',io.sockets.rooms);
             socket.emit('rooms', io.of('/').adapter.rooms);
        });

        handleClientDisconnection(socket,nickNames,nameUsed)
    })
}

function assignGuestName(socket,guestNumber,nickNames,nameUsed){
    var name = '用户' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult',{
        success:true,
        name:name
    });
    nameUsed.push(name);

    return guestNumber + 1;
}

function joinRoom(socket,room){
    socket.join(room);
    currentRoom[socket.id] = room;
    socket.emit('joinResult',{room:room});
    socket.broadcast.to(room).emit('message',{
        text:nickNames[socket.id] + ' has joined '+ room + '.'
    });

    // var usersInRoom  =  io.sockets.clients(room);

    var usersInRoom = io.of('/').in(room).clients;
// socket.emit('rooms', io.of('/').adapter.rooms);
    if(usersInRoom.length > 1){
        var usersInRoomSummary = 'Users currently in' + room + ':';
        for(var index in usersInRoom){
            var userSocketId = usersInRoom[index].id;
            if(userSocketId != socket.id){
                if(index > 0)
                    usersInRoomSummary += ',';
            }
            usersInRoomSummary += '.';
            socket.emit('message',{text:usersInRoomSummary});
        }
        
    }
}
function handleNameChangeAttempts(socket,nickNames,nameUsed){
    socket.on('nameAttempt',function(name){
        if(name.indexOf('Guest') == 0){ //Name cannot begin with "Guest"
            socket.emit('nameResult',{
                success:false,
                message:'Name cannot begin with "Guest".'
            });
        }else{
            if(nameUsed.indexOf(name) == -1){
                var preName = nickNames[socket.id];
                var preNameIndex = nameUsed.indexOf(preName);
                nameUsed.push(name);
                nickNames[socket.id] = name;
                delete nameUsed[preNameIndex];

                socket.emit('nameResult',{
                    success:true,
                    name:name
                });
            }else{
                socket.emit('nameResult',{
                    success:false,
                    message:'That name is already in use.'
                });
            }
        }
    });
}
function handleMessageBroadcasting(socket){
    socket.on('message',function(message){
        socket.broadcast.to(message.room).emit('message',{
            text:nickNames[socket.id] + ' : ' + message.text
        });
    });
}

function handleRoomJoining(socket){
    socket.on('join',function(room){
        socket.leave(currentRoom[socket.id]);
        joinRoom(socket,room.newRoom);
    })
}

function handleClientDisconnection(socket){
    socket.on('disconnect',function(){
        var nameIndex = nameUsed.indexOf(nickNames[socket.id]);
        delete nameUsed[nameIndex];
        delete nickNames[socket.id];
    })
}