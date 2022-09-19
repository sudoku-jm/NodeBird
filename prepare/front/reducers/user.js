import produce from 'immer';

export const initalState = {
  followLoading: false, // follow 시도중
  followDone: false,
  followError: null,
  unfollowLoading: false, // follow 시도중
  unfollowDone: false,
  unfollowError: null,
  logInLoading: false, // 로그인 시도중
  logInDone: false,
  logInError: null,
  logOutLoading: false, // 로그아웃 시도중
  logOutDone: false,
  logOutError: null,
  signUpLoading: false, // 회원가입 시도중
  signUpDone: false,
  signUpError: null,
  changeNicknameLoading: false, // 닉네임 변경 시도중
  changeNicknameDone: false,
  changeNicknameError: null,
  me: null,
  signUpdata: {},
  loginData: {},
};

// 액션명은 변수로 빼준다. 다른 곳에서 불러다 쓸 수 있으니 export 시켜준다. saga에서도 사용된다. 액션만 사용되는 폴더를 따로 만들어서 분리시켜도 좋다.
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

export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST';
export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS';
export const CHANGE_NICKNAME_FAILRE = 'CHANGE_NICKNAME_FAILRE';

// 포스트 추가,삭제 시 내가 쓴 게시물 수
export const ADD_POST_TO_ME = 'ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'REMOVE_POST_OF_ME';

const dummyUser = (data) => ({
  ...data,
  id: 1,
  // email: data.email,
  // password: data.password,
  nickname: '미니미니',
  Posts: [
    { id: 1 },
  ],
  Followings: [
    { nickname: '부기초' },
    { nickname: 'minimini' },
    { nickname: 'jm91' },
  ],
  Followers: [
    { nickname: '부기초' },
    { nickname: 'minimini' },
    { nickname: 'jm91' },
    { nickname: 'sudoku' },
  ],
});

// 로그인 액션
export const loginRequestAction = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data
  };
};

// 로그아웃 액션
export const logoutRequestAction = () => {
  return {
    type: LOG_OUT_REQUEST,
  };
};

// 회원가입 액션
export const signUpRequestAction = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};

const reducer = (state = initalState, action) => {
  return produce(state, (d) => {
    const draft = d;
    switch (action.type) {
      //= ============== FOLLOW
      case FOLLOW_REQUEST:
        draft.followLoading = true;
        draft.followError = null;
        draft.followDone = false;
        break;
      case FOLLOW_SUCCESS:
        draft.followLoading = false;
        draft.followDone = true;
        draft.me.Followings.push({ id: action.data }); // 팔로우 하려는 사람 아이디추가
        break;
      case FOLLOW_FAILRE:
        draft.followLoading = false;
        draft.followError = action.error;
        break;
      //= ============== UNFOLLOW
      case UNFOLLOW_REQUEST:
        draft.unfollowLoading = true;
        draft.unfollowError = null;
        draft.unfollowDone = false;
        break;
      case UNFOLLOW_SUCCESS:
        draft.unfollowLoading = false;
        draft.unfollowDone = true;
        draft.me.Followings = draft.me.Followings.filter((v) => v.id !== action.data);
        break;
      case UNFOLLOW_FAILRE:
        draft.unfollowLoading = false;
        draft.unfollowError = action.error;
        break;
      //= ==============로그인
      case LOG_IN_REQUEST:
        draft.logInLoading = true;
        draft.logInError = null;
        draft.logInDone = false;
        break;
      case LOG_IN_SUCCESS:
        draft.logInLoading = false;
        draft.logInDone = true;
        draft.me = dummyUser(action.data);
        break;
      case LOG_IN_FAILRE:
        draft.logInLoading = false;
        draft.logInError = action.error;
        break;

        //= =============로그아웃
      case LOG_OUT_REQUEST:
        draft.logOutLoading = true;
        draft.logOutError = null;
        draft.logOutDone = false;
        break;
      case LOG_OUT_SUCCESS:
        draft.logOutLoading = false;
        draft.logOutDone = true;
        draft.me = null;
        break;
      case LOG_OUT_FAILRE:
        draft.logOutLoading = false;
        draft.logOutError = action.error;
        break;

        //= =============회원가입
      case SIGN_UP_REQUEST:
        draft.signUpLoading = true;
        draft.signUpError = null;
        draft.signUpDone = false;
        break;
      case SIGN_UP_SUCCESS:
        draft.signUpLoading = false;
        draft.signUpDone = true;
        break;
      case SIGN_UP_FAILRE:
        draft.signUpLoading = false;
        draft.signUpError = action.error;
        break;

        //= =============닉네임 변경
      case CHANGE_NICKNAME_REQUEST:
        draft.changeNicknameLoading = true;
        draft.changeNicknameError = null;
        draft.changeNicknameDone = false;
        break;
      case CHANGE_NICKNAME_SUCCESS:
        draft.changeNicknameLoading = false;
        draft.changeNicknameDone = true;
        break;
      case CHANGE_NICKNAME_FAILRE:
        draft.changeNicknameLoading = false;
        draft.changeNicknameError = action.error;
        break;
        //= =============== 포스트 추가, 삭제
      case ADD_POST_TO_ME:
        draft.me.Posts.unshift({ id: action.data });
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: [{ id: action.data }, ...state.me.Posts]
        //   }
      case REMOVE_POST_OF_ME:
        draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data);
        break;
        // return {
        //   ...state,
        //   me: {
        //     ...state.me,
        //     Posts: state.me.Posts.filter((v) => v.id !== action.data)
        //   }
        // };
      default:
        break;
    }
  });
};

export default reducer;
