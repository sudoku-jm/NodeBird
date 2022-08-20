import React from "react";
import { useCallback, useState, useMemo } from "react";
import { Form, Input, Button } from "antd";
// import PropTypes from "prop-types";
import Link from "next/link";
import { useDispatch, useSelector } from 'react-redux'
import { loginRequestAction } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch()
  const {isLoggingIn} = useSelector((state) => state.user);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");


  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  
  const styleFrom = useMemo(() => ({ padding: 10 }), []);
  const styleButton = useMemo(() => ({ marginTop: 10 }), []);

  const onSubmitForm = useCallback(() => {
    /* onFinish는 e.preventDefault가 적용되어 있다. ant디자인에서는 쓰지 않는다.*/
    // console.log(id, password);
    dispatch(loginRequestAction(id, password));
  }, [id, password]);
  
  return (
    <>
      <Form onFinish={onSubmitForm} style={styleFrom}>
        <div>
          <label htmlFor="user-id">아이디</label>
          <br />
          <Input name="user-id" value={id} onChange={onChangeId} required />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            type="password"
            name="user-password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div style={styleButton}>
          <Button type="primary" htmlType="submit" loading={isLoggingIn}>
            로그인
          </Button>
          <Link href="/signup">
            <a>
              <Button>회원가입</Button>
            </a>
          </Link>
        </div>
      </Form>
    </>
  );
};


export default LoginForm;
