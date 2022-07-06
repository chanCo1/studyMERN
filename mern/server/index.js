import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import Post from './Router/Post.js';
import User from './Router/User.js';

const app = express();
// const port = 5000;
// 프로젝트 폴더 위치
const __dirname = path.resolve();

// 설정 파일 내용 가져오기 (config.env)
dotenv.config({ path: path.join(__dirname, '../../config.env') });

app.use(express.static(path.join(__dirname, '../client/build')));
// 이미지 폴더 사용
app.use('/image', express.static('./image'));

// body-phaser는 express 4.x 버전 이후 부터 내장 모듈이 됨
app.use(express.text()); // JSON형식의 파라미터 수신 가능
app.use(express.json()); // TEXT형식의 파라미터 수신 가능
app.use(express.urlencoded({ extended: true }));

/** router 가져오기 */
// -> 공통적으로 라우팅 규칙이 적용되게 해야함

// post 가져오기
app.use('/api/post', Post);

// user 가져오기
app.use('/api/user', User);

// 서버 구동시
app.listen(process.env.PORT, async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL);
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