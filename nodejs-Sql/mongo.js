var mongodb = require('mongodb');
var server = new mongodb.Server('127.0.0.1',27017,{});

var client = new mongodb.Db('myDb',server,{w:1});

client.open( (e)=>{
    if(e) throw e;
    client.collection('test_insert',(e,collection)=>{
        if(e) throw e;
        console.log('We are now able to perform queries.');
        collection.insert({
            title:"I like cake",
            body:"It is good."
        },
        {safe:true},
        function(err,docs){
            if(err) throw err;
            console.log('Doc ID is: '+ docs[0]);
        })
    })
})