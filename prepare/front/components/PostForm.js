import React, { useCallback, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);

  const [text, onChangeText, setText] = useInput('');
  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);
  const onSubmit = useCallback(() => {
    dispatch(addPost(text));

    // 만약 서버쪽에서 문제가 생겨 다시 시도해달라고 했을 때, 텍스트를 지워버리면 문제가 될 수 있다. setText('') 의 위치는 여기가 맞지않다.
    // addPostDone 의 상태가 true가 되었을 때 지워주는게 더 정확하다.
    // setText('');
  }, [text]);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder="어떤 신기한 일이 있었나요?" />
      <div>
        {/* 이미지 업로드란 */}
        <input type="file" multiple hidden ref={imageInput} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit">짹짹</Button>
      </div>
      <div>
        {/* 이미지 미리보기란 */}
        {imagePaths.map((y) => (
          <div key={y} style={{ display: 'inline-block' }}>
            <img src={y} style={{ width: '200px' }} alt={y} />
            <div>
              <Button>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
