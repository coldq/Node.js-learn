var EventEmitter = require('events').EventEmitter;

var t = new EventEmitter();

t.on('test',function(){
    console.log('eventEmitter test.');
});

t.emit('test');