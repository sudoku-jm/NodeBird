export const initalState = {
  logInLoading : false,      //로그인 시도중
  logInDone : false,       
  logInError : null,     
  logOutLoading : false,    //로그아웃 시도중
  logOutDone : false,
  logOutError : null,
  signUpLoading : false,    //회원가입 시도중
  signUpDone : false,
  signUpError : null,
  me : null,
  signUpdata : {},
  loginData : {},
}

//액션명은 변수로 빼준다. 다른 곳에서 불러다 쓸 수 있으니 export 시켜준다. saga에서도 사용된다. 액션만 사용되는 폴더를 따로 만들어서 분리시켜도 좋다.
export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILRE = 'LOG_IN_FAILRE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILRE = 'LOG_OUT_FAILRE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILRE = 'SIGN_UP_FAILRE';

export const FOLLOW_REQUEST = 'FOLLOW_REQUEST';
export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS';
export const FOLLOW_FAILRE = 'FOLLOW_FAILRE';

export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST';
export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS';
export const UNFOLLOW_FAILRE = 'UNFOLLOW_FAILRE';



const dummyUser = (data) => ({
  ...data,
  id : 1,
  nickname : '미니미니',
  Posts : [],
  Followings : [],
  Followers : [],
})


//로그인 액션
export const loginRequestAction = (data) => {
  return {
    type : LOG_IN_REQUEST,
    data
  }
}

//로그아웃 액션
export const logoutRequestAction = () => {
  return {
    type : LOG_OUT_REQUEST,
  }
}

//회원가입 액션
export const signUpRequestAction = (data) => {
  return {
    type : SIGN_UP_REQUEST,
    data,
  }
}


const reducer = (state = initalState, action) => {
  switch(action.type){
    //===============로그인
    case LOG_IN_REQUEST : 
      return {
        ...state,
        logInLoading : true,
        logInError : null,
        logInDone : false,
      };
    case LOG_IN_SUCCESS : 
      return {
        ...state,
        logInLoading : false,
        logInDone : true,
        me : dummyUser(action.data),
      };
    case LOG_IN_FAILRE : 
      return {
        ...state,
        logInLoading : false,
        logInError : action.error,
      };

      //==============로그아웃
      case LOG_OUT_REQUEST : 
        return {
          ...state,
          logOutLoading : true,
          logOutError : null,
          logOutDone : false,
      };
      case LOG_OUT_SUCCESS : 
        return {
          ...state,
          logOutLoading : false,
          logOutDone : true,
          me : null,
      };
      case LOG_OUT_FAILRE : 
        return {
          ...state,
          logOutLoading : false,
          logOutError : action.error
      };

      //==============회원가입
      case SIGN_UP_REQUEST : 
        return {
          ...state,
          signUpLoading : true,
          signUpError : null,
          signUpDone : false,
      };
      case SIGN_UP_SUCCESS : 
        return {
          ...state,
          signUpLoading : false,
          signUpDone : true,
      };
      case SIGN_UP_FAILRE : 
        return {
          ...state,
          signUpLoading : false,
          signUpError : action.error
      };
      default : 
        return state;
  }
}

export default reducer;