var Photo = require('../models/photo');
var path = require('path');
var fs = require('fs');
var join = path.join;//引用path.join，这样就可以用path命名变量

var multiparty = require('multiparty');

var photos = [];

photos.push({
    name:'Node.js Logo',
    path:'http://nodejs.org/images/logos/nodejs-green.png'
});
photos.push({
    name:'千反田',
    path:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1498040517001&di=c0c47cb8a3eaeda40c6c2f42a21cd06d&imgtype=0&src=http%3A%2F%2Fb.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2Fb7fd5266d0160924525274f2d60735fae7cd34e0.jpg'
});

exports.list = function(req,res,next){
    Photo.find({},function(err,photos){ //{}查出photo集合中的所以记录
        if(err) return next(err);
        res.render('photos',{title:'Photos',photos:photos});
    })
    
};

exports.form = function(req,res){
    res.render('photos/upload',{
        title:'Photo upload'
    });
};
exports.submit = function(dir){  //uncomplete
    return function(req,res,next){
         var form = new multiparty.Form();
        form.parse(req,function(err,fields,files){
            if(err) return next(err);
            var filesTmp = JSON.stringify(files,null,2);
            
            console.log(filesTmp)
                
        })
        // var img = req.files.photo.image;
        // var name = req.body.photo.name || img.name;
        // var path = join(dir,img.name);
        // fs.rename(img.path,path,function(err){
        //     if(err) return next(err);

        //     Photo.create({
        //         name:name,
        //         path:img.name
        //     },function(err){
        //         if(err) return next(err);
        //         res.redirect('/photos');
        //     })
        // })
    }
}