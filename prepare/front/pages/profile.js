import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

function Profile() {
  const { me } = useSelector((state) => state.user);

  useEffect(() => {
    // 로그아웃 하는 경우
    if (!(me && me.id)) {
      Router.push('/');
    }
  }, [me && me.id]);

  if (!me) {
    return null;
  }

  return (
    <AppLayout>
      {/* 닉네임 수정 from */}
      <NicknameEditForm />

      {/* 팔로잉, 팔로워 */}
      <FollowList header="팔로잉" data={me?.Followings} />
      <FollowList header="팔로워" data={me?.Followers} />
    </AppLayout>
  );
}

export default Profile;
