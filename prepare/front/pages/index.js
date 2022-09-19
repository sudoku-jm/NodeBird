import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_REQUEST } from '../reducers/post';

function Home() {
  const dispatch = useDispatch();
  const { logInDone } = useSelector((state) => state.user);
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  useEffect(() => {
    dispatch({
      type: LOAD_POSTS_REQUEST,
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      const winSrcollY = window.scrollY;
      const clientH = document.documentElement.clientHeight;
      const documentScrollH = document.documentElement.scrollHeight - 300;
      /* scrollY : 얼마나 내렸는지,
        clientHeight : 화면 높이,
        scrollHeight : 총 길이

        scrollY + clientHeight = scrollHeight
      */
      console.log(winSrcollY, clientH, documentScrollH);
      if (winSrcollY + clientH > documentScrollH) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_POSTS_REQUEST, // 새로운 것
          });
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [hasMorePosts]);

  return (
    <AppLayout>
      {/* 로그인 했을 때만 PostForm이 보인다. */}
      {logInDone && <PostForm />}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
}

export default Home;
