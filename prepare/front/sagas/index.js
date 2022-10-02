import axios from 'axios';
import { all, fork, } from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
  axios.defaults.baseURL = 'http://localhost:5500';
  yield all([
    fork(userSaga),
    fork(postSaga),
  ]);
}
