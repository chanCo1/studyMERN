import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';
// import bodyParser from 'body-parser';

const app = express();
const port = 5000;
// 프로젝트 폴더 위치
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));
app.use(express.text());  // JSON형식의 파라미터 수신 가능
app.use(express.json());  // TEXT형식의 파라미터 수신 가능
app.use(express.urlencoded({ extended: true }));

// 서버 구동시
app.listen(port, async () => {
  try {
    mongoose.connect('mongodb+srv://cwoo:1q2w3e@cluster.h1gcy.mongodb.net/?retryWrites=true&w=majority');
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

app.post('/api/test', (req, res, next) => {
  res.status(200).send('success!');
  // res.status(200).json({ success: true });
  console.log(req.body);
});
