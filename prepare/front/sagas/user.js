import { all, delay, fork, put, takeLatest } from 'redux-saga/effects';
import {
  LOG_IN_FAILRE, LOG_IN_REQUEST, LOG_IN_SUCCESS,
  LOG_OUT_FAILRE, LOG_OUT_REQUEST, LOG_OUT_SUCCESS,
  SIGN_UP_FAILRE, SIGN_UP_REQUEST, SIGN_UP_SUCCESS
} from '../reducers/user';
// import axios from 'axios';

/* ==========로그인============ */
// function loginAPI(data) {
//     return axios.post('/api/login',data)
// }

function* logIn(action) {
  try {
    //    const result = yield call(loginAPI, action.data)
    yield delay(1000);

    yield put({
      type: LOG_IN_SUCCESS,
      data: {
        email: action.data,
      }
    });
  } catch (err) {
    yield put({
      type: LOG_IN_FAILRE,
      error: err.response.data
    });
  }
}

/* ==========로그아웃============ */
// function logoutAPI() {
//     return axios.post('/api/logout')
// }

function* logOut() {
  try {
    //    const result = yield call(logoutAPI) ;
    yield delay(1000);

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

// function signUpAPI() {
//     return axios.post('/api/signup')
// }

function* signUp() {
  try {
    //    const result = yield call(signUpAPI) ;
    yield delay(1000);
    // throw new Error('');
    yield put({
      type: SIGN_UP_SUCCESS,
      // data : result.data
    });
  } catch (err) {
    yield put({
      type: SIGN_UP_FAILRE,
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

export default function* userSaga() {
  yield all([
    fork(watchLogin),
    fork(watchLogout),
    fork(watchSignUp),
  ]);
}
