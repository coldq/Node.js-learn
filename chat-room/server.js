//static server 

var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    mime = require('mime'),
    cache = {};

// send 404 info 
function send404(response){
    response.writeHead(404,{"Content-Type":"text/plain"});
    response.write("Error 404:resource not found.");
    response.end();
}

//send file,wirte content-type by mime
function sendFile(response,filePath,fileContents){
    response.writeHead(200,
    {"Content-Type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}

//read file,firstly look in cache ;if file is not exsit,send 404;else send file
function serveStatic(response,cache,absPath){
    if(cache[absPath])
        sendFile(response,absPath,cache[absPath]);
    else{
        fs.exists(absPath,function(exists){
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath] = data;
                        sendFile(response,absPath,data);
                    }
                });
            }else{
                send404(response);
            }
        })
    }
}
var server = http.createServer(function(request,response){
    var filePath = false;
    if(request.url == '/')
        filePath = 'public/index.html';
    else
        filePath = 'public'+ request.url;
    
    var absPath = './'+filePath;
    console.log("Request:"+absPath);
    serveStatic(response,cache,absPath);
})

server.listen(3000,function(){
    console.log("Server listening on http://localhost:3000");
})
var chatServer = require('./lib/chat_server');
chatServer.listen(server);