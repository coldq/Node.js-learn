//利用闭包，可设置输出参数的logger

function setup(format){
    let regexp = /:(\w+)/g;

    return function logger(req,res,next){
        var str = format.replace(regexp,function(match,property){
            // format中用匹配到的值替换参数
            return req[property];
        });
        console.log(str);
        next();
    }
}

module.exports = setup;