const express = require('express');
const cors = require('cors');

const postRouter = require('./routes/post'); 
const userRouter = require('./routes/user'); 
const db = require('./models'); // model > index.js 에서 등록된 db를 들고온다.
const app = express(); //호출을 한 번 해야한다.

//model > index.js 에서 등록한 db를 sync() 메소드를 통해 연결.
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

app.use(cors({
  origin : '*',
  // credentials : false, //추후 true로 변경.
})); 
app.use(express.json());
app.use(express.urlencoded({extended : true}));

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

//==================라우터 분리===========

//게시글 작성
app.use('/post',postRouter); 

//유저정보, 회원가입
app.use('/user',userRouter); 

app.listen(5500, () => {
  console.log('서버 실행 중~!~!~!');
});