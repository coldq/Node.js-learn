function t(a,b){
    this.a = a;
    this.b = b;
}
t.prototype.fs = function(){
    console.log('fs'+this.a+this.b);
    return 'fss';
}

var ts = new t('a','b');
console.log(ts.fs());