import React, { useState, useCallback, useEffect } from "react";
import { Form, Input, Checkbox, Button } from "antd";
import PropTypes from "prop-types";

import AppLayout from "../components/AppLayout";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { signUpRequestAction } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";

const TextInput = ({ value }) => {
  return <div>{value}</div>;
};

TextInput.propTypes = {
  value: PropTypes.string,
};

const ErrorMsg = styled.div`
  color: red;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const {signUpLoading, signUpDone} = useSelector((state) => state.user);
  
  const [email, onChangeEmail, setEmail] = useInput("");
  const [nickname, onChangeNickname, setNickname] = useInput("");
  const [password, onChangePassword, setPassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  
  useEffect(() => {
    if(signUpDone){
      setEmail('')
      setNickname('')
      setPassword('')
      setPasswordCheck('')
      setTerm(false)
    }
  },[signUpDone])

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    dispatch(signUpRequestAction(email,password,nickname))
  }, [email, password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordError(e.target.value !== password); //해당부분이 달라 커스텀 훅을 쓰지 않음.
      setPasswordCheck(e.target.value);
    },
    [password]
  );

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Form onFinish={onSubmit} style={{ padding: 10 }}>
        <TextInput value="회원가입" />
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
        </div>
        <div>
          <label htmlFor="user-nick">닉네임</label>
          <br />
          <Input
            name="user-nick"
            value={nickname}
            required
            onChange={onChangeNickname}
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <Input
            name="user-password"
            type="password"
            value={password}
            required
            onChange={onChangePassword}
          />
        </div>
        <div>
          <label htmlFor="user-password-check">비밀번호체크</label>
          <br />
          <Input
            name="user-password-check"
            type="password"
            value={passwordCheck}
            required
            onChange={onChangePasswordCheck}
          />
          {passwordError && <ErrorMsg>비밀번호가 일치하지 않습니다.</ErrorMsg>}
        </div>
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            미니미니 말을 잘 들을 것을 동의합니다.
          </Checkbox>
          {termError && <ErrorMsg>약관에 동의하셔야 합니다.</ErrorMsg>}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button type="primary" htmlType="submit" loading={signUpLoading}>
            가입하기
          </Button>
        </div>
      </Form>
    </AppLayout>
  );
};

export default Signup;
