export const initalState = {
  isLoggedIn : false,
  user : null,
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
        ...state.user,
        isLoggedIn : true,
        user : action.data,  
      }
      case 'LOG_OUT' : 
        return {
          ...state.user,
          isLoggedIn : false,
          user : null,
      }
      default : 
        return state;
  }
}

export default reducer;