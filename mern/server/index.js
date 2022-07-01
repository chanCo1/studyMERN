import express from 'express';
import path, { resolve } from 'path';
import mongoose from 'mongoose';

const app = express();
const port = 4000;

// 프로젝트 폴더 위치
const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, '../client/build')));

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
