/*
    server websocket framework.
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);

// 设置客户端根目录
app.use(express.static('./'));
app.use(express.static('./libs'));
app.use(express.static('./images'));
// 监听端口
var port = 80;
http.listen( port, function() {
    console.log('[DEBUG] Listening on *:' + port);
});

//app.get('/', function (req, res) {
//    console.log(req);
//    res.sendFile( '/front/index.html' , { root:__dirname });
//});