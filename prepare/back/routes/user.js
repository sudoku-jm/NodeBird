const express = require('express');
const { User } = require('../models');
const bcrypt = require('bcrypt');
const router = express.Router();

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