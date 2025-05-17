const socket = io();
let currentGame = null;

// 玩家加入
document.getElementById('nameForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  socket.emit('join', username);
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('players-section').style.display = 'block';
});

// 更新在线玩家列表
socket.on('playerList', (players) => {
  const list = document.getElementById('playerList');
  list.innerHTML = players
    .filter(player => player.username !== socket.username)
    .map(player => `
      <div class="player">
        <span>${player.username}</span>
        <button onclick="challenge('${player.id}')">Challenge</button>
      </div>
    `).join('');
});

// 发起挑战
window.challenge = (targetId) => {
  socket.emit('challenge', targetId);
};

// 接受挑战
socket.on('challenge', ({ from, fromId }) => {
  if (confirm(`${from} challenges you! Accept?`)) {
    socket.emit('acceptChallenge', { fromId });
    currentGame = fromId;
    showQuestionUI();
  }
});

// 显示题目界面
function showQuestionUI() {
  document.getElementById('players-section').style.display = 'none';
  document.getElementById('game-section').style.display = 'block';
  // 这里添加题目渲染逻辑
}