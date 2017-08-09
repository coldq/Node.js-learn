

let redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');

client.on('error',function(err){
    console.log(err)
    client = redis.createClient(6380,'127.0.0.1');
});
let running = 0;

listen(); 

 function listen(){
        if(running < 5){
            running++;
            client.blpop('highTasks','tasks', 0,(err,value)=>{
                console.log(`add a task : ${running,value}`);
                handle(value);
            });  
        }          
}
        


function handle(task){
    if(running < 5) listen();
    let time = 6000*Math.random();
    setTimeout(()=>{
        running--;
        console.log(`finish a task : ${running,task}`);
        if(running < 5) listen();
    },3000)
}
       