const express = require('express');
const router = express.Router();

const {Post, User, Image, Comment} = require('../models');

router.get('/', async (req, res, next) => {   //GET /posts

    try{
        const posts = await Post.findAll({    // 모든 게시글 가지고 오기
            limit : 10, //10개만 가져와라
            //offset : 0, // 1 ~ 10번 게시글, 10이면 11~20번 게시글
            //하지만 실무에서는 이런 방식 잘 안씀. 중간에 게시글을 지워버리거나 추가하면 로딩하는 와중에 꼬인다. 게시글을 빼먹거나 같은 게시글을 2번 불러오기도 함.
            //limit 과 lastId 방식을 많이씀. lastId는 고정이므로.
            // 무한스크롤, 페이징에서 많이쓰임.
            //정렬 : 최신부터
            //where : { id : lastId },~
            order : [
              ['createdAt', 'DESC'],
              [Comment,'createdAt','DESC']    //댓글 내림차순
            ], // 최신부터 정렬 .2차원 배열로 작성.
            include: [{
                model: User,
                attributes: ['id', 'nickname'],
              }, {
                model: Image,
              }, {
                model: Comment,
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }],
              }, {
                model: User, // 좋아요 누른 사람
                as: 'Likers',
                attributes: ['id'],
              }, {
                model: Post,
                as: 'Retweet',
                include: [{
                  model: User,
                  attributes: ['id', 'nickname'],
                }, {
                  model: Image,
                }]
              }],
        });

        console.log(posts);
        res.status(200).json(posts);

    }catch(error){
        console.error(error);
        next(error);
    }
});

module.exports = router;