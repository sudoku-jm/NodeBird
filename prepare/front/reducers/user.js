export const initalState = {
  isLoggedIn : false,
  me : null,
  signUpdata : {},
  loginData : {},
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


const reducer = (state = initalState, action) => {
  switch(action.type){
    case 'LOG_IN' : 
      return {
        ...state,
        isLoggedIn : true,
        me : action.data,  
      }
      case 'LOG_OUT' : 
        return {
          ...state,
          isLoggedIn : false,
          me : null,
      }
      default : 
        return state;
  }
}

export default reducer;