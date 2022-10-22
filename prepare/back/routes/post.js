const express = require('express');
const router = express.Router();
const {Post, Image, User, Hashtag, Comment} = require("../models");
const {isLoggedIn} = require('./middlewares');

//post 작성
router.post('/', isLoggedIn, async (req ,res, next) => {  // POST /post
  // res.json('작성완료');
  // res.json({id : 1, content:'hello'});  //작성된 게시글
  
  try{
    const post = await Post.create({
      content : req.body.content,
      UserId: req.user.id, //로그인 시 라우터에 serializeUser를 통해 user.id를 들고 있다.(passport참고) 그래서 req.user에 접근이 가능하다.
    });

    const fullPost = await Post.findOne({
      where : { id : post.id },
      include : [{
        model : Image,
      },{
        model : Comment,
        include : [{
          model : User,
          attributes : ['id', 'nickname'],
        }],
      },{
        model : User,
        attributes : ['id', 'nickname'],
      },{
        model : User,
        as : 'Likers',
        attributes : ['id']
      }]
    });
    
    res.status(201).json(fullPost); //다시 프론트로 json형태로 돌려줌.

  }catch(error){
    console.error(error);
    next(error);
  }
});

// post 코멘트 작성
router.post('/:postId/comment', isLoggedIn, async (req ,res, next) => {  //POST /post/postID/comment
  //주소부분에서 동적으로 바뀌는 것을 파라미터라고 한다

  
  try{
    // 존재하지 않는 게시글에 댓글 달 우려가 있으므로 한 번 더 검사를 해준다.
    // 서버 쪽에서는 한 번 더 꼼꼼히 검사를 해주는 것이 좋다.
    const post = await Post.findOne({
      where : {id : req.params.postId}
    });
    if( !post ) {
      return res.status(403).send('존재하지 않는 게시글입니다.');
    }

    const comment = await Post.create({
      content : req.body.content, // 데이터로 전달받은 부분 req.body...
      PostId : parseInt(req.params.postId, 10), // 파라미터로 전달받은 부분 req.params...
      UserId : req.user.id,
    });

    const fullComment = await Comment.findOne({
      where: { id: comment.id },
      include: [{
        model: User,
        attributes: ['id', 'nickname'],
      }],
    });


    res.status(201).json(fullComment); //다시 프론트로 json형태로 돌려줌.

  }catch(error){
    console.error(error);
    next(error);
  }
});


//like post 좋아요
router.patch('/:postId/like', isLoggedIn, async(req, res, next) => { //PATCH /post/1/like
  try{
    const post = await Post.findOne({ where : {id : req.params.postId } });

    if(!post){
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }

    //테이블 관계를 이용 models > post.js > associate부분 참고
    //Post와 User 테이블 관계 중 as Likers 부분 관계 ,
    // DB조작 시 await 꼭 붙여주기
    await post.addLikers(req.user.id);  //Like테이블에 추가. (다대다관계)
    //어떤 포스트(PostId)에 어떤 유저가(req.user.id) 좋아요를 했는지 넣는다(addLikers).
    //시퀄라이즈를 통해 만들면 쉽게 구현할 수 있음.
    /*
      PostId   UserId
      1         30        1번 게시글 30번 유저 좋아요 추가addLikers
      1         60        1번 게시글 60번 유저 좋아요 추가addLikers
      2         59
      2         30
    */

    res.status(200).json({ PostId : post.id, UserId : req.user.id });
  }catch(error){
    console.error(error);
    next(error);
  }
});

//like post 좋아요 취소
router.delete('/:postId/like', isLoggedIn, async(req, res, next) => { //DELETE /post/1/like
  try{
    const post = await Post.findOne({ where : {id : req.params.postId } });

    if(!post){
      return res.status(403).send('게시글이 존재하지 않습니다.');
    }
    await post.removeLikers(req.user.id);

    res.status(200).json({ PostId : post.id, UserId : req.user.id });
  }catch(error){
    console.error(error);
    next(error);
  }
});

//post 삭제
router.delete('/:postId', isLoggedIn, async (req, res, next) => {  //DELETE post/1
  try{
    //시퀄라이즈에서는 제거할 때 destroy로 삭제한다.
    await Post.destroy({
      where:{
        id : req.params.postId,
        UserId : req.user.id,   //본인이 작성한 게시글만 삭제할 수 있도록
      }
    });
    
    res.status(200).json({ PostId : parseInt(req.params.postId, 10) }); //문자가 아닌 숫자로 전달
  
  }catch(error){
    console.error(error);
    next(error);
  }
});



module.exports = router;