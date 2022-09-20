const express = require('express');
const postRouter = require('./routes/post'); 

const app = express(); //호출을 한 번 해야한다.



app.get('/',(req, res) => {
  res.send('hello express');
});

app.get('/api',(req, res) => {
  res.send('hello api');
});

app.get('/posts',(req, res) => {
  //json 객체로 응답
  res.json([
    { id : 1, content: 'hello' },
    { id : 2, content: 'hello' },
    { id : 3, content: 'hello' },
  ]);
});

//라우터 분리
app.use('/post',postRouter); 

app.listen(5500, () => {
  console.log('서버 실행 중');
});