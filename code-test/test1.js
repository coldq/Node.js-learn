var assert = require('assert');
var Todo = require('./Todo');
var todo = new Todo();
var testsCompleted = 0;

function deleteTest(){
    todo.add('Del me');
    assert.equal(todo.getCount(),1,'1 item should exist');
    todo.deleteAll();
    assert.equal(todo.getCount(),0,'No item');
    testsCompleted++;
}
function doAsyncTest(cb){
    todo.doAsync(function(value){
        assert.ok(value,'Callback should be passed true');
        testsCompleted++;
        cb();
    });
}
deleteTest();
doAsyncTest(function(){
    console.log('complete' + testsCompleted + 'tests');
});