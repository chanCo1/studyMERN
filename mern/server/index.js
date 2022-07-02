import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';
import { Post } from './Model/Post.js';
import { Counter } from './Model/Counter.js';

const app = express();
const port = 5000;
// 프로젝트 폴더 위치
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));
// body-phaser는 express 4.x 버전 이후 부터 내장 모듈이 됨
app.use(express.text()); // JSON형식의 파라미터 수신 가능
app.use(express.json()); // TEXT형식의 파라미터 수신 가능
app.use(express.urlencoded({ extended: true }));

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

/** submit */
app.post('/api/post/submit', (req, res, next) => {
  const temp = req.body;

  (async () => {
    try {
      // find 중괄호에 조건을 걸 수 있음
      const counter = await Counter.findOne({ name: 'counter' }).exec();
      temp.postNum = counter.postNum;
      console.log(temp);

      const CommunityPost = new Post(temp);

      try {
        await CommunityPost.save();

        Counter.updateOne(
          { name: 'counter' }, 
          { $inc: { postNum : 1 } },
        ).then(() => {
          res.status(200).json({ success: true });
        });
      } catch (e) {
        res.status(400).json({ success: false });
      }
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** list */
app.post('/api/post/list', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.find().exec();
      res.status(200).json({ success: true, postList: response });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});

/** detail */
app.post('/api/post/detail', (req, res, next) => {
  (async () => {
    try {
      const response = await Post.findOne({ postNum: Number(req.body.postNum) }).exec();
      console.log(response);
      res.status(200).json({ success: true, post: response });
    } catch (e) {
      res.status(400).json({ success: false });
    }
  })();
});
