import { Form, Input, Button } from "antd";
import React, { useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import useInput from "../hooks/useInput";
// import { useSelector } from "react-redux";

// const CommentForm = ({ post }) => {
const CommentForm = () => {
  // const id = useSelector((state) => state.user.me?.id);
  const [commentText, onChangeCommentText] = useInput("");
  const onSubmitComment = useCallback(() => {
    // console.log(post.id, commentText);
    //게시글 id 아래에 댓글을 달 것이므로.
  }, [commentText]);

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
