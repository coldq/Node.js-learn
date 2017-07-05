//显示可疑内容，防止xxs攻击，转译内容
function divEscapedContentElement(message){
    return $('<div></div>').text(message);
}

function divSystemContentElement(message){
    return $('<div></div>').html(message);
}

function processUserInput(chatApp,socket){
    var message = $('#send-message').val();
    console.log(message,message.charAt(0));
    var systemMessage;
    if(message.charAt(0) == '/'){
        systemMessage = chatApp.processCommand(message);
        if(systemMessage){
            $('#messages').append(divSystemContentElement(systemMessage));
        }
    }else{
        chatApp.sendMessage($('#room').text(),message);
       
        $('#messages').append(divEscapedContentElement(message));
        console.log($('#messages').prop('scrollHeight'));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    }
    $('#send-message').val('');
}

var socket = io.connect();
$(document).ready(function(){
    var chatApp = new Chat(socket);

    socket.on('nameResult',function(result){
        var message;
        if(result.success){
            message = '名字改变成功为： '+result.name+'.';
        }else{
            message = result.message;
        }
        $("#messages").append(divSystemContentElement(message));
    });

    socket.on('joinResult',function(result){
        $('#room').text(result.room);
        $('#messages').append(divSystemContentElement('Room Changed.'));
    });

    socket.on('message',function(message){
        var newElement = $('<div></div>').text(message.text);
        $('#messages').append(newElement);
    });

    socket.on('rooms',function(rooms){
        $('#room-list').empty();

        for(var room in rooms){
          
            if(rooms[room] != '')
                $('#room-list').append(divEscapedContentElement(rooms[room]));
        }
        $('#room-list div').click(function(){
            chatApp.processCommand('/join '+ $(this).text());
            $('#send-message').focus();
        });
    });
    setInterval(function(){
        socket.emit('rooms');
    },1000);

    $('#send-message').focus();

    $('#send-form').submit(function(){
        processUserInput(chatApp,socket);
        return false;
    });
});
