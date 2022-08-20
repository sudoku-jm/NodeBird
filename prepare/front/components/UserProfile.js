import React from "react";
import { Card, Avatar, Button } from "antd";
import { useCallback } from "react";
// import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {logoutRequestAction} from "../reducers/user";
const UserProfile = () => {

  const dispatch = useDispatch();
  const {me, isLoggingOut} = useSelector((state) => state.user);

  //로그아웃
  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
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
      <Card.Meta avatar={<Avatar>JM</Avatar>} title={me.nickname[0]} />
      <Button onClick={onLogout} loading={isLoggingOut}>로그아웃</Button>
    </Card>
  );
};

// UserProfile.propTypes = {
//   setIsLoggedIn: PropTypes.node.isRequired,
// };

export default UserProfile;
