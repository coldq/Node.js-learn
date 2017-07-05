module.exports =  function errorHandler(){
    var env = process.env.NODE_ENV || 'development'; // 生产环境还是调试export NODE_ENV=production && node xx.js
    return function(err,req,res,next){
        res.statusCode = 500;
        switch(env){
            case 'development':
                res.setHeader('Content-Type','application/json');
                res.end(JSON.stringify(err));
                break;
            default:
                res.end('Server error');
        }
    }
}