import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';
import { post } from './Model/Post.js';

const app = express();
const port = 5000;
// 프로젝트 폴더 위치
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));
// body-phaser는 express 4.x 버전 이후 부터 내장 모듈이 됨
app.use(express.text());  // JSON형식의 파라미터 수신 가능
app.use(express.json());  // TEXT형식의 파라미터 수신 가능
app.use(express.urlencoded({ extended: true }));



// 서버 구동시
app.listen(port, async () => {
  try {
    mongoose.connect('mongodb+srv://cwoo:1q2w3e@cluster.h1gcy.mongodb.net/community?retryWrites=true&w=majority');
    console.log('Connecting MongoDB!!');
  } catch(e) {
    console.error(e);
  }
  console.log('* * * * * * * * * * * * * * * * * * *');
  console.log('*   E x p r e s s   S e r v e r !   *');
  console.log('* * * * * * * * * * * * * * * * * * *');
});



app.get('/', (req, res, next) => {
  res.sendFile(path.join(resolve(), '../client/build'));
});

app.post('/api/post/submit', (req, res, next) => {
  const temp = req.body;
  console.log(temp);

  const CommunityPost = new post(temp);
  CommunityPost.save()
    .then(() => {
      res.status(200).json({ success: true });
    })
    .catch((e) => {
      res.status(400).json({ success: false });
    });
});
