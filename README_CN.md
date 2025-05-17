# Web Assignment

## 1.项目简介
本项目使用了Node.js、Express、和 Socket.IO来构建一个个人介绍网站，其中包含了本人的信息以及一些交互式测验页面。

### 1.1 技术栈


### 1.2 项目目录

assignment/             # 项目根目录
├── bin/                # 可执行文件（保留原有）
│   └── www             
├── public/             # 静态资源目录（需整理）
│   ├── images/         # 图片资源
│   ├── stylesheets/    # CSS文件（重命名并整理）
│   │   └── style.css   # 全局样式
│   └── javascripts/    # 前端JS文件
│       └── quiz.js     # 问答页面交互逻辑
├── routes/             # 路由目录（需修改）
│   ├── index.js        # 主路由文件（处理首页、关于页）
│   └── quiz.js         # 问答页面路由（处理游戏逻辑）
├── views/              # 模板目录
│   ├── layout.ejs      # 基础布局模板
│   ├── index.ejs       # 首页模板
│   ├── about.ejs       # 关于页模板
│   ├── quiz.ejs        # 问答页模板
│   └── partials/       # 公共组件
│       ├── navbar.ejs  # 导航栏
│       └── footer.ejs  # 页脚
├── app.js              # 主入口文件（需修改配置）
├── package.json        # 依赖管理（保留原有）
└── server.js           # 服务器启动文件

### 1.3 项目结构

### 1.4 服务器启动方式
**1.安装 Node.js 和 npm**
请确保系统中已经安装了 [Node.js](https://nodejs.org/) 和 npm（Node 包管理器）。
**2.安装依赖**
在项目根目录运行以下命令安装所需的依赖：（已经完成，生成 node_modules 包）
**3.启动服务器**
在项目根目录运行`npm start '端口号'`启动界面。
服务器将会在 `http://localhost:'你填写的端口号'` 启动，当然你填写的端口号被占用后默认的端口号为`8080`。
故建议您最好配置 `BOX URL` 的端口号为 8080，点击 `BOX URL` 启动界面。

## 2. 服务端

### 2.1 简介
本项目的服务端使用 [Express](https://expressjs.com/) 框架构建，并通过 [Socket.IO](https://socket.io/) 实现实时通信。服务端的主要功能包括处理 HTTP 请求、静态文件服务、存储和读取数据，以及处理用户提交的答案和生成排行榜。

### 2.2 主要功能

1. **路由**
   - `/`: 首页路由。
   - `/form`: 表单提交路由。
   - `/users`: 用户相关路由。
   - `/test`: 测试路由。
   
2. **静态文件服务**
通过 `express.static` 中间件提供 `public` 目录下的静态文件。

1. **数据存储**

使用 `fs-extra` 模块在 `data/answers.json` 文件中存储用户提交的答案。

1. **Socket.IO 实时通信**

   - 连接和断开通知。
   - 处理用户提交的答案并保存到本地 JSON 文件。
   - 响应客户端的排行榜请求，根据用户的得分生成排行榜并发送给客户端。
2. **错误处理**

   - 配置了基本的错误处理机制，包括 404 错误和一般性错误处理。
