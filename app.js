var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');
var socketIo = require('socket.io');

// 路由
var indexRouter = require('./routes/index');
var quizRouter = require('./routes/quiz'); // 新增问答路由

var app = express();
var server = http.createServer(app);
var io = socketIo(server);

// 玩家在线列表
let onlinePlayers = new Map();

// 设置静态文件目录
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

// 中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 路由绑定
app.use('/', indexRouter);
app.use('/quiz', quizRouter);

// 修改根路由，使用 sendFile 代替 render
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Socket.IO 实时逻辑
io.on('connection', (socket) => {
  console.log('A player connected:', socket.id);

  // 玩家加入
  socket.on('join', (username) => {
    onlinePlayers.set(socket.id, { username, score: 0 });
    io.emit('playerList', Array.from(onlinePlayers.values()));
  });

  // 发起挑战
  socket.on('challenge', (targetId) => {
    const challenger = onlinePlayers.get(socket.id);
    io.to(targetId).emit('challenge', { 
      from: challenger.username, 
      fromId: socket.id 
    });
  });

  // 接受挑战
  socket.on('acceptChallenge', ({ fromId }) => {
    const players = [socket.id, fromId];
    players.forEach(id => io.to(id).emit('startGame', { opponentId: id === socket.id ? fromId : socket.id }));
  });

  // 处理答案提交
  socket.on('submitAnswer', ({ isCorrect, opponentId }) => {
    // 计分逻辑（根据作业规则）
    const currentScore = onlinePlayers.get(socket.id).score;
    const newScore = isCorrect ? currentScore + 2 : currentScore;
    onlinePlayers.set(socket.id, { ...onlinePlayers.get(socket.id), score: newScore });
    
    // 广播得分更新
    io.emit('scoreUpdate', { playerId: socket.id, score: newScore });
  });

  // 断开连接
  socket.on('disconnect', () => {
    onlinePlayers.delete(socket.id);
    io.emit('playerList', Array.from(onlinePlayers.values()));
  });
});

// 修改错误处理
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  // 改为发送HTML错误页面
  res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

// 启动服务器
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});

module.exports = { app, server };
