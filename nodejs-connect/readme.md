## connect

connect：可以灵活定义中间件
```
var app = connect();
app.use(mid)
    .use('route',mid)
    .listen(port);
```
mid就是一个中间件，也是一个函数。
按照use的顺序匹配中间件，对http请求进行层层处理；

利用closure，传入参数，返回我们想要的中间件。