const connect = require('connect');
const logger = require('./middleware/logger');
let errorHandler = require('./middleware/errorHandler')
// const logger = (req,res,next)=>{
//     console.log('%s %s',req.method,req.url);
//     next();
// };

const restrict = (req,ree,next)=>{
    let authorrization = req.headers.authorrization;
    if(!authorrization) return next(new Error('Unauthorized.'));
    let parts = authorrization.split(' ');
    let scheme = parts[0];
    let auth = new Buffer(parts[1],'base64').toString.split(':');
    let user = auth[0], pass = auth[1];

    console.log('%s %s',user,pass);
    next();
}

const admin = (req,res,next)=>{
    switch(req.url){
        case '/':
            res.end('try /users');
            break;
        case '/users':
            res.setHeader('Content-type','application/json');
            res.end(JSON.stringify(['tobi','loki','jane']));
            break;
    }
}

const hello = (req,res,next)=>{
    // res.setHeader('Content-type','text/plain');
    // res.end('hello');
    var err = new Error('user not found');
    err.notFound = true;
    next(err);
}
let app = connect();
app.use(logger(':method :url'))
    // .use('/admin',restrict)
    .use('/admin',admin)
    .use(hello)
    .use(errorHandler);

app.listen(3000);

