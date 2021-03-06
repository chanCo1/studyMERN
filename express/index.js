const express = require('express');
const app = express();
const port = 3000;

// 해당 폴더의 정적인 요소 사용 (이미지 등)
app.use(express.static('public'));
// http 요청에서 body 부분을 express가 받아들이게 한다.
app.use(express.urlencoded({extended: false}));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
});

// // 프로그래밍이 위에서 부터 아래로 진행 하기 때문에
// // 클라이언트가 지정한 라우팅 규칙에 해당 하는 하나를 express가 만나게 되면 그 후 어떤 내용이 있더라도 무시된다.
// // -> 안녕하세요 출력, 밑에 test!는 출력되지 않음
// app.get('*', (req, res) => {
//   res.send('안녕하세요!')
// });

// post는 서버로 부터 데이터를 보낼 때 사용
app.post('/calculator', (req, res) => {
  console.log(req.body);
  // let result = Number(req.body.num1) + Number(req.body.num2);
  // res.sendFile(__dirname + '/public/result.html');
});

// 라우팅 맨 마지막에 '*'를 설정하여 404설정 가능(맨위에 하면 안됨)
app.all('*', (req, res) => {
  res.status(404).send('찾을 수 없는 페이지입니다!')
});

app.listen(port, () => {
  console.log(`Example app listen ${port}!`)
});