var fs = require('fs');

fs.watchFile('./watch',function(file){
    fs.readdir('./watch',function(err,files){
        if(err) throw err;
        for(var i in files){   
            console.log(files[i]);
        }
    });
})