const express = require('express');
const router = express.Router();

router.post('/', (req ,res) => {
  // res.json('작성완료');
  res.json({id : 1, content:'hello'});  //작성된 게시글
});

router.delete('/',(req, res) => {
  res.send('hello api');
});


module.exports = router;