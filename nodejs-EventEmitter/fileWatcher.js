// watch file in done

function Watcher(watchDir,processDir){
    this.watchDir = watchDir;
    this.processDir = processDir;
}

var events = require('events'),
    util = require('util');

util.inherits(Watcher,events.EventEmitter);

var fs = require('fs'),
    watchDir = './watch',
    processDir = './done';

Watcher.prototype.watch = function(){
    var watcher = this;
    fs.readdir(this.watchDir,function(err,files){
        if(err) throw err;
        for(var i in files){ 
            watcher.emit('process',files[i]);
        }
    });
}

Watcher.prototype.start = function(){
    console.log('start');
    var watcher = this;
    fs.watchFile(watchDir,function(){
        watcher.watch();
    })
}


var w = new Watcher(watchDir,processDir);

w.on('process',function(file){
    var watchFile = this.watchDir + '/' + file;
    var processFile = this.processDir + '/' + file.toLowerCase();
    fs.rename(watchFile,processFile,function(err){
        if(err) throw err;
    });
});

w.start();