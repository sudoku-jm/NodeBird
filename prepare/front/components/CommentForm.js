import { Form, Input, Button } from "antd";
import React, { useCallback, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {ADD_COMMENT_REQUEST} from '../reducers/post';

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const {addCommentDone} = useSelector((state) => state.post )
  const id = useSelector((state) => state.user.me?.id);

  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  useEffect(() => {
    if(addCommentDone){
      setCommentText('')
    }
  },[addCommentDone])
  const onSubmitComment = useCallback(() => {
    // console.log(post.id, commentText);
    //게시글 id 아래에 댓글을 달 것이므로.

    /* 
    재사용한다면 함수로 만들고,
    한번만 쓰인다 싶으면 액션명을 이렇게 바로 적어주는거도 괜찮다.
    */
    dispatch({ 
      type : ADD_COMMENT_REQUEST,
      data : {
        content : commentText,
        postId : post.id,
        userId : id
      }
    });

  }, [commentText,id]);

  const styleFormItem = useMemo(
    () => ({ position: "relative", margin: 0 }),
    []
  );
  const styleButton = useMemo(
    () => ({ position: "absolute", right: 0, bottom: -40 }),
    []
  );

  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item style={styleFormItem}>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button type="primary" htmlType="submit" style={styleButton}>
          삐약
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
