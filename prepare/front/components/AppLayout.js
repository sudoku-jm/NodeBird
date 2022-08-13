import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import { Col, Input, Menu, Row } from "antd";

import LoginForm from "./LoginForm";
import UserProfile from "./UserProfile";

import {useSelector} from 'react-redux';

import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
  .ant-row {
    margin-right: 0 !important;
    margin-left:0 !important;
  }
  .ant-col:first-child{
    padding-left:0 !important;
  }
  .ant-col:last-child{
    padding-right: 0 !important;
  }
`;

const AppLayout = ({ children }) => {

  //isLoggedIn의 결과가 바뀌면 AppLayout 컴포넌트가 리렌더링 된다.
  // const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const {isLoggedIn} = useSelector((state) => state.user);

  return (
    <div>
      <Global/>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>노드버드</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="mail">
          <Input.Search enterButton style={{ verticalAlign: "middle" }} />
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {/* {dummy.isLoggedIn ? <UserProfile /> : <LoginForm />} */}
          {isLoggedIn ? (
            <UserProfile />
          ) : (
            <LoginForm />
          )}
        </Col>
        <Col xs={24} md={12}>
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://www.zerocho.com"
            target="_blank"
            rel="noreferrer noopener"
          >
            Made by ZeroCho
          </a>
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
