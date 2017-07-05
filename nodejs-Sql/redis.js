let redis = require('redis');
let client = redis.createClient(6379,'127.0.0.1');

client.on('error',function(err){
    console.log(err)
});

//add
client.set('color','red',redis.print);

client.get('color',(e,v)=>{
    if(e) throw e;
    console.log('Got: '+v);
});

//add hashSet
client.hmset('camping',{
    'shelter':'2-p tent',
     cooking:'campstove'
},redis.print)

client.hget('camping','cooking',(e,v)=>{
    if(e) throw e;
    console.log('cooking: '+v);
});

//get keys of hashSet
client.hkeys('camping',(e,v)=>{
    if(e) throw e;
    v.map((key) => console.log(' '+ key))
});

//链表,lrange 0,-1表示取出start end范围内的链表元素，end=-1表示最后
client.lpush('tasks','task1',redis.print);
client.lpush('tasks','task2',redis.print);
client.lrange('tasks',0,-1,(err,items)=>{
    if(err) throw err;
    items.map((item) => console.log(' '+ item));
});

//集合,元素唯一，重复会忽略
client.sadd('ip','12.1.1.1',redis.print);
client.sadd('ip','12.1.1.1',redis.print);
client.sadd('ip','122.1.23.2',redis.print);
client.smembers('ip',(e,v)=>{
    if(e) throw e;
    console.log(v);
})