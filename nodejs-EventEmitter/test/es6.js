
let co = require('co');
function print(str){
    return Promise.resolve(str).then(function(s){
        console.log(s);
    });
}
function *test(params) {
    let p = params;

    yield print('t1');
    yield print('t2');
    // setTimeout(console.log('sleep'),1000);
    yield print('t3');

    console.log('t4');
    console.log(p)
    return 1;
}

co(test('sno'));
