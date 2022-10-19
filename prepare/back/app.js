const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');
const postRouter = require('./routes/post');  //게시글 1개만
const postsRuter = require('./routes/posts'); //여러 게시글
const userRouter = require('./routes/user'); 
const db = require('./models'); // model > index.js 에서 등록된 db를 들고온다.
const passportConfig = require('./passport'); //passport > index.js 등록
const morgan = require('morgan');

// env 파일 연결 들고오기
dotenv.config();

const app = express(); //호출을 한 번 해야한다.
//model > index.js 에서 등록한 db를 sync() 메소드를 통해 연결.
db.sequelize.sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch(console.error);

//패스포트 연결
passportConfig();

app.use(morgan('dev')); //front -> back 요청 시 어디 api로 요청했는지 디버깅 용이.

//credential true가 되어야 쿠키도 같이 전달이 된다.
app.use(cors({
  // origin : '*',
  // origin : true,
  origin : 'http://localhost:3000',
  credentials : true, 
})); 
app.use(express.json());
app.use(express.urlencoded({extended : true}));

/* ====미들웨어 추가==== */

//쿠키
app.use(cookieParser(process.env.COKKIE_SECRET));

//세션
app.use(session({
  saveUninitialized : false,
  resave : false,
  secret : process.env.COKKIE_SECRET
}));
app.use(passport.initialize());
app.use(session());



app.get('/',(req, res) => {
  res.send('hello express');
});

app.get('/api',(req, res) => {
  res.send('hello api');
});

// app.get('/posts',(req, res) => {
//   //json 객체로 응답
//   res.json([
//     { id : 1, content: 'hello' },
//     { id : 2, content: 'hello' },
//     { id : 3, content: 'hello' },
//   ]);
// });

//==================라우터 분리===========

app.use('/posts',postsRuter); 
//게시글 작성
app.use('/post',postRouter); 

//유저정보, 회원가입
app.use('/user',userRouter); 

//에러처리 미들웨어는 마지막으로 들어감. 직접 작성해줄 수 있다.
app.use((err, req, res, next) => {

});

app.listen(5500, () => {
  console.log('서버 실행 중~!~!~!');
});