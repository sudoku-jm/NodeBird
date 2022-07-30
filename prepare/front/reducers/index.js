//초기화
const initalState = {
  user : {
    isLoggedIn : false,
    user : null,
    signUpdata : {},
    loginData : {},
  },
  post : {
    mainPosts : []
  }
}

//로그인 액션
export const loginAction = (data) => {
  return {
    type : 'LOG_IN',
    data
  }
}

//로그아웃 액션
export const logoutAction = () => {
  return {
    type : 'LOG_OUT',
  }
}

//비동기 action creator (redux-saga에서 다룰 것)

//액션
// const changeNickname = (data) => {
//   return {
//     type : 'CHAGNE_NICKNAME',
//     data
//   }
// };

// changeNickname('boogicho');

//reducer
//reducer란 ? 이전상태와 액션을 통해서 다음상태를 만들어내는 부분.
//(이전상태 , 액션) => 다음상태
const rootReducer = (state = initalState, action) => {
  switch (action.type) {
    case 'LOG_IN' : 
      return {
        ...state,
        user : {
          ...state.user,
          isLoggedIn : true,
          user : action.data,
        }
      }
      case 'LOG_OUT' : 
        return {
          ...state,
          user : {
            ...state.user,
            isLoggedIn : false,
            user : null,
          }
        }
        default : 
          return {
            ...state,
        }
    }
};

export default rootReducer;