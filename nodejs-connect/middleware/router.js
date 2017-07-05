let parse = require('url').parse;

module.exports = function route(obj){
    return function(req,res,next){
        if(!obj[req.method]){
            next();
            return;
         }
        let routes = obj[req.method];
        let url = parse(req.url);
        let paths = Object.keys(routes);

        for(let i = 0; i < paths.length; i++){
            let path = paths[i];
            console.log(routes[path]);
            let fn = routes[path];
            path = path
                    .replace(/\//g,'\\/')  //把 / 替换为 \/
                    .replace(/:(\w+)/g,'([^\\/]+)'); // 把 ：id替换 为（[^\/]+)
            let re = new RegExp('^'+path+'$');  //构造新正则
            console.log('regExp: '+re);
            let captures = url.pathname.match(re);  //匹配
            if(captures){
                let args = [req,res].concat(captures.slice(1)); //参数数组合并
                fn.apply(null,args);  //传参
                return;
            }
        
        }
        next();
    }
    
}