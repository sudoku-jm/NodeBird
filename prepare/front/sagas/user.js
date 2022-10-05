import { all, delay, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  FOLLOW_FAILRE, FOLLOW_REQUEST, FOLLOW_SUCCESS,
  UNFOLLOW_FAILRE, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS,
  LOG_IN_FAILRE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_FAILRE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  SIGN_UP_FAILRE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS,
} from '../reducers/user';

/* ==========로그인============ */
function loginAPI(data) {
  // data.email, data.password 전달.
  return axios.post('/user/login', data);
}

function* logIn(action) {
  try {
    const result = yield call(loginAPI, action.data);
    console.log('result loginAPI', result);
    // yield delay(1000);

    yield put({
      type: LOG_IN_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========로그아웃============ */
function logoutAPI() {
  return axios.post('/user/logout');
}

function* logOut() {
  try {
    yield call(logoutAPI);
    // yield delay(1000);

    yield put({
      type: LOG_OUT_SUCCESS,
      // data : result.data
    });
  } catch (err) {
    yield put({
      type: LOG_OUT_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========회원가입============ */

function signUpAPI(data) {
  return axios.post('/user', data);
  /*
    data는 email, nickname, password라는 객체이다.
    backend로 전달(서버)
  */
}

function* signUp(action) {
  try {
    const result = yield call(signUpAPI, action.data);
    console.log('signUpAPI', result);
    // throw new Error('');
    yield put({
      type: SIGN_UP_SUCCESS,
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========팔로우============ */

// function followAPI() {
//     return axios.post('/api/follow')
// }

function* follow(action) {
  try {
    //    const result = yield call(followAPI) ;
    yield delay(1000);
    yield put({
      type: FOLLOW_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: FOLLOW_FAILRE,
      error: err.response.data,
    });
  }
}
/* ==========언팔로우============ */

// function unfollowAPI() {
//     return axios.post('/api/unfollow')
// }

function* unfollow(action) {
  try {
    //    const result = yield call(unfollowPI) ;
    yield delay(1000);
    yield put({
      type: UNFOLLOW_SUCCESS,
      data: action.data
    });
  } catch (err) {
    yield put({
      type: UNFOLLOW_FAILRE,
      error: err.response.data
    });
  }
}

// LOG_IN_REQUEST 실행 : saga와 reducer LOG_IN_REQUEST는 동시에 실행된다.
function* watchLogin() {
  yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogout() {
  yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
  yield takeLatest(SIGN_UP_REQUEST, signUp);
}
function* watchFollow() {
  yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchUnFollow() {
  yield takeLatest(UNFOLLOW_REQUEST, unfollow);
}

export default function* userSaga() {
  yield all([
    fork(watchFollow),
    fork(watchUnFollow),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
  ]);
}
