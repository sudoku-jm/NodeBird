import React from 'react';
import { useSelector } from 'react-redux';
import NicknameEditForm from '../components/NicknameEditForm';
import AppLayout from '../components/AppLayout';
import FollowList from '../components/FollowList';

function Profile() {
  const { me } = useSelector((state) => state.user);

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
