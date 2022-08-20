import {all, call, fork, put, take } from 'redux-saga/effects';
import axios from 'axios';

/* ==========로그인============ */
function loginAPI(data) { 
    return axios.post('/api/login',data)
}

//yield take('LOG_IN_REQUEST', logIn);실행 시 type,과 data는 action으로 매개변수로 전달이 된다.
function* logIn(action) { 
   /* 
    action.type : 액션의 타입
    action.data : 액션의 데이터
   */
    try {
       const result = yield call(loginAPI, action.data) 
       /* 
       보통 함수 호출 시
       loginAPI(action.data) 이런식으로 사용하지만

       call은 펼쳐준다.
       call(loginAPI, action.data) 

       인수가 여러개라면?
        call(loginAPI, action.data, 'a', 'b', 'c') 
        function loginAPI(data, a, b, c) { ... }

       */

        /* 
            yield를 붙이지 않아도 되는데 왜 붙이는가?
            saga는 테스트할 때 편하다. 
            프로그램 동작만 하게 하는게 아니라, 재대로 동작하는지 보장해야하기 때문에. 찾기쉽고 해소하기 쉽게 하기위해. generator는 테스트하기 편하다.
        */
        yield put({ 
            type : 'LOG_IN_SUCCESS',
            data : result.data  
        }) ;

    }catch(err){
        yield put({ 
            type : 'LOG_IN_FAILRE',
            data : err.response.data  
        }) ;
    }
   
}

/* ==========로그아웃============ */
function logoutAPI() { 
    return axios.post('/api/logout')
}

function* logOut() { 
   
    try {
       const result = yield call(logoutAPI) 

        
        yield put({ 
            type : 'LOG_OUT_SUCCESS',
            data : result.data  
        }) ;

    }catch(err){
        yield put({ 
            type : 'LOG_OUT_FAILRE',
            data : err.response.data  
        }) ;
    }
   
}

/* ==========addPost============ */
function addPostAPI(data) { 
    return axios.post('/api/post', data)
}

function* addPost(action) { 
   
    try {
       const result = yield call(addPostAPI, action.data) 

        
        yield put({ 
            type : 'ADD_POST_SUCCESS',
            data : result.data  
        }) ;

    }catch(err){
        yield put({ 
            type : 'ADD_POST_FAILRE',
            data : err.response.data  
        }) ;
    }
   
}


function* watchLogin() {
    yield take('LOG_IN_REQUEST', logIn);    
}
function* watchLogout() {
    yield take('LOG_OUT_REQUEST', logOut);
}
function* watchAddPost() {
    yield take('ADD_POST_REQUEST', addPost);
}

export default function* rootSaga() {
    yield all([
        fork(watchLogin),    
        fork(watchLogout),
        fork(watchAddPost),
    ])
}