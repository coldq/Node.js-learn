let connect = require('connect');

let router = require('./middleware/router');

let rewrite = require('./middleware/rewrite');

let routers = {
    GET:{
        '/user':function(req,res){
            res.end('tobi,loki,kk');
        },
        '/user/:id':function(req,res,id){
            res.end('user' + id);
        },
        '/blog/posts':function(req,res){
            res.end('posts');
        }
    },
    DELETE:{
        '/user/:id':function(req,res,id){
            res.end('deleted user' + id);
        }
    }
}

connect()
    .use(rewrite)
    .use(router(routers))
    .listen(3000);