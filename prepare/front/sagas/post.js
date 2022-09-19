import { all, delay, fork, put, takeLatest, throttle } from 'redux-saga/effects';
import { nanoid } from 'nanoid';
import {
  generateDummyPost,
  ADD_COMMENT_FAILRE, ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS,
  ADD_POST_FAILRE, ADD_POST_REQUEST, ADD_POST_SUCCESS,
  LOAD_POSTS_FAILRE, LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS,
  REMOVE_POST_FAILRE, REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS
} from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from '../reducers/user';
// import axios from 'axios';

/* ==========loadPosts============ */
// function loadPostsAPI(data) {
//     return axios.get('/api/posts', data)
// }

function* loadPosts() {
  try {
    //    const result = yield call(loadPostsAPI, action.data) ;
    yield delay(1000);
    yield put({
      type: LOAD_POSTS_SUCCESS,
      data: generateDummyPost(10),
    });
  } catch (err) {
    yield put({
      type: LOAD_POSTS_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========addPost============ */
// function addPostAPI(data) {
//     return axios.post('/api/post', data)
// }

function* addPost(action) {
  try {
    //    const result = yield call(addPostAPI, action.data) ;
    yield delay(1000);

    const id = nanoid();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data
      }
    });
    // saga에서는 user.js 리듀서에 접근 할 수 있다.
    yield put({
      type: ADD_POST_TO_ME,
      data: id
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========removePost============ */
// function removePostAPI(data) {
//     return axios.delete('/api/post', data)
// }

function* removePost(action) {
  try {
    //    const result = yield call(addPostAPI, action.data) ;
    yield delay(1000);

    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data
    });
    // saga에서는 user.js 리듀서에 접근 할 수 있다.
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========addComment============ */
// function addCommentAPI(data) {
//     return axios.post('/api/post/${data.postId}/comment', data)
// }

function* addComment(action) {
  try {
    //    const result = yield call(addCommentAPI, action.data) ;
    yield delay(1000);

    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILRE,
      error: err.response.data
    });
  }
}

function* watchLoadPosts() {
  // yield takeLatest(LOAD_POSTS_REQUEST, loadPosts);
  yield throttle(2000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchLoadPosts),
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
  ]);
}
