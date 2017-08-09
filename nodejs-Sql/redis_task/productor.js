let redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');

client.on('error',function(err){
    console.log(err)
    client = redis.createClient(6380,'127.0.0.1');
});

let count = 1;
setInterval(()=>{
    client.rpush('tasks','task'+count,redis.print);
    count++;
},800)

setInterval(()=>{
    client.rpush('highTasks','highTask'+count,redis.print);
    count++;
},2000)