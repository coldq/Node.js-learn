let url = require('url');

module.exports = function rewrite(req,res,next){
    console.log('before rewrite: '+ req.url);
    let path = url.parse(req.url).pathname;
    let macth = path.match(/^\/blog\/posts\/(.+)/);
    if(macth){
        req.url = '/blog/posts';
        console.log('After rewrite: '+ req.url);
        next();
    }else{
        next();
    }
}