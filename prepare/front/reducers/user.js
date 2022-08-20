export const initalState = {
  isLoggingIn : false,      //로그인 시도중
  isLoggedIn : false,       //로그인 상태
  isLoggingOut : false,     //로그아웃 시도중
  me : null,
  signUpdata : {},
  loginData : {},
}



//로그인 액션
export const loginRequestAction = (data) => {
  return {
    type : 'LOG_IN_REQUEST',
    data
  }
}

//로그아웃 액션
export const logoutRequestAction = () => {
  return {
    type : 'LOG_OUT_REQUEST',
  }
}

//saga에서 LOG_IN_SUCCESS ,LOG_IN_FAILRE, LOG_OUT_SUCESS ,LOG_OUT_FAILRE을 호출한다.


const reducer = (state = initalState, action) => {
  switch(action.type){
    //===============로그인
    case 'LOG_IN_REQUEST' : 
    console.log('reducer login')
      return {
        ...state,
        isLoggingIn : true,
      }
    case 'LOG_IN_SUCCESS' : 
      return {
        ...state,
        isLoggingIn : false,
        isLoggedIn : true,
        me : {...action.data, nickname : 'jeongmin'},  
      }
    case 'LOG_IN_FAILRE' : 
      return {
        ...state,
        isLoggedIn : false,
        isLoggingIn : false,
      }

      //==============로그아웃
      case 'LOG_OUT_REQUEST' : 
        return {
          ...state,
          isLoggingOut : true,
      }
      case 'LOG_OUT_SUCCESS' : 
        return {
          ...state,
          isLoggingOut : false,
          isLoggedIn : false,
          me : null,
      }
      case 'LOG_OUT_FAILRE' : 
        return {
          ...state,
          isLoggingOut : false,
      }
      default : 
        return state;
  }
}

export default reducer;