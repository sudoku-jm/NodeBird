import React from "react";
import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import {logoutAction} from "../reducers";
const UserProfile = () => {

  const dispatch = useDispatch();
  //로그아웃
  const onLogout = useCallback(() => {
    dispatch(logoutAction());
  }, []);
  return (
    <Card
      actions={[
        <div key="twit">
          짹짹
          <br />0
        </div>,
        <div key="followings">
          팔로잉
          <br />0
        </div>,
        <div key="follower">
          팔로워
          <br />0
        </div>,
      ]}
    >
      <Card.Meta avatar={<Avatar>JM</Avatar>} title="JeongMin" />
      <Button onClick={onLogout}>로그아웃</Button>
    </Card>
  );
};

UserProfile.propTypes = {
  setIsLoggedIn: PropTypes.node.isRequired,
};

export default UserProfile;
