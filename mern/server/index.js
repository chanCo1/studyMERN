import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';
import router from './Router/Post.js';

const app = express();
const port = 5000;
// 프로젝트 폴더 위치
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));
// body-phaser는 express 4.x 버전 이후 부터 내장 모듈이 됨
app.use(express.text()); // JSON형식의 파라미터 수신 가능
app.use(express.json()); // TEXT형식의 파라미터 수신 가능
app.use(express.urlencoded({ extended: true }));

// router 가져오기
app.use('/api/post', router);

// 서버 구동시
app.listen(port, async () => {
  try {
    mongoose.connect(
      'mongodb+srv://cwoo:1q2w3e@cluster.h1gcy.mongodb.net/community?retryWrites=true&w=majority'
    );
    console.log('Connecting MongoDB!!');
  } catch (e) {
    console.error(e);
  }
  console.log('* * * * * * * * * * * * * * * * * * *');
  console.log('*   E x p r e s s   S e r v e r !   *');
  console.log('* * * * * * * * * * * * * * * * * * *');
});

/** 빌드된 리액트 가져오기 */
app.get('/', (req, res, next) => {
  res.sendFile(path.join(resolve(), '../client/build'));
});

app.get('*', (req, res, next) => {
  res.sendFile(path.join(resolve(), '../client/build'));
});