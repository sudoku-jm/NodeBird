const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models');
const passport = require('passport');
const router = express.Router();

//passport.authenticate의 내부 메커니즘을 통해서 LocalStrategy 이쪽으로 인증 처리 위임. local.js 전략을 실행시킨다.

/*

    (err, user, info) : 서버에러, 인증객체, 정보
    예) return done(null, false, {reason : '존재하지 않는 사용자입니다.'});
    예) return done(null, user); 
    예) return done(null, false, {reason : '비밀번호가 틀렸습니다.'});
    예) return done(error); 서버쪽 에러
*/

//로그인
router.post('/login', (req, res, next) => {//미들웨어 확장.
    passport.authenticate('local', (err, user, info) => {
        //passport > local.js 성공 시 콜백 실행.
        if(err){ //done(erorr) 로 왔을 때. 클라이언트쪽에선 null이다.
            console.error(err);
            return next(err)
        }

        if(info){ //info에 값이 있을 경우는 클라이언트 에러.
            return res.status(401).send(info.reason);
        }

        return req.login(user, async(loginerr) => {
            //패스포트쪽 로그인
            if(loginerr){
                console.error(loginerr);
                return next(loginerr);
            }

            //로그인 성공
            // local.js > return done(null, user); 전달 받은 내용 

            // res.setHeader('Cookie', 'cxlhy');
            return res.status(200).json(user);
        })
    })(req, res, next);
});


//로그아웃
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy(); //유저 정보 세션에서 삭제
    res.send('ok');
});

router.post('/', async (req ,res, next) => {    //POST /user
    console.log('req',req.body);
    try{

        //비동기인지 아닌지는 공식문서를 통해 찾아보기
        const exUser = await User.findOne({
            where : {
                email : req.body.email,
            } 
        });

        if(exUser){ //exUser가 null이 아니라면 = 이미 존재한다면
            return res.status(403).send('이미 사용 중인 아이디입니다.'); //return을 꼭 붙여준다.
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); //숫자가 높을 수록 암호화가 좋지만 서버가 좋지않다면 시간이 오래걸린다. 컴퓨터 성능에 따라 셋팅을 맞춰주자.
        await User.create({
            email: req.body.email,
            nickname : req.body.nickname,
            password : hashedPassword,
        });
    
        // res.setHeader('Access-Control-Allow-Origin', '*'); 
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); 
        /* 
        * : 모든 주소 허용.
        http://localhost:3000 : 3000포트(브라우저)에서 오는 것은 모두 허용하겠다.

        차단은 브라우저가 차단하지만 서버에서 허용해야한다.
        */
        res.status(201).send('ok');
    }catch(error){
        console.error(error);
        next(error);  //status(500) 500번 에러. 서버쪽 에러
    }

});

module.exports = router;