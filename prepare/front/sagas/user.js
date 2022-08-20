import { all, delay, fork, put, takeLatest } from "redux-saga/effects"
// import axios from 'axios';

/* ==========로그인============ */
// function loginAPI(data) { 
//     return axios.post('/api/login',data)
// }


function* logIn(action) { 

    try {
        console.log('saga login')
    //    const result = yield call(loginAPI, action.data) 
       yield delay(1000);

        yield put({ 
            type : 'LOG_IN_SUCCESS',
            data : action.data  
        }) ;

    }catch(err){
        yield put({ 
            type : 'LOG_IN_FAILRE',
            data : err.response.data  
        }) ;
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
            type : 'LOG_OUT_SUCCESS',
            // data : result.data  
        }) ;

    }catch(err){
        yield put({ 
            type : 'LOG_OUT_FAILRE',
            data : err.response.data  
        }) ;
    }
   
}
//LOG_IN_REQUEST 실행 : saga와 reducer LOG_IN_REQUEST는 동시에 실행된다.
function* watchLogin() {
    yield takeLatest('LOG_IN_REQUEST', logIn);    
}
function* watchLogout() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}


export default function* userSaga() {
    yield all([
        fork(watchLogin),
        fork(watchLogout),
    ])
}