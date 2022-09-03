import { nanoid } from 'nanoid';

export const initalState = {
  mainPosts: [{
    id: nanoid(),
    User: {
      id: 1,
      nickname: 'jm'
    },
    content: '첫 번째 게시글 #해시태그 #익스프레스',
    Images: [
      {
        src: 'https://images.unsplash.com/photo-1659114538192-0f8caaaaa698?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      },
      {
        src: 'https://images.unsplash.com/photo-1657299156528-2d50a9a6a444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
      },
      {
        src: 'https://images.unsplash.com/photo-1659204622556-148a4346af00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
      }
    ],
    Comments: [
      {
        id: nanoid(),
        User: {
          id: nanoid(),
          nickname: 'nero',
        },
        content: '안녕 반가워요',
      },
      {
        id: nanoid(),
        User: {
          id: nanoid(),
          nickname: 'jm',
        },
        content: '댓글은 이렇게 다는건가?',
      }],
  }],
  imagePaths: [],
  addPostLoading: false, // 게시글 작성 시도
  addPostDone: false,
  addPostError: false,
  removePostLoading: false, // 게시글 삭제 시도
  removePostDone: false,
  removePostError: false,
  addCommentLoading: false, // 코멘트 작성 시도
  addCommentDone: false,
  addCommentError: false,
};

const dummyPost = (data) => ({
  id: data.id,
  content: data.content,
  User: {
    id: 1,
    nickname: '미니미니'
  },
  Images: [],
  Comments: [],
});

const dummyComment = (data) => ({
  id: nanoid(),
  content: data,
  User: {
    id: 1,
    nickname: '미니미니'
  },
});

// 액션 이름을 상수로 뺌. switch case에서 const값을 재활용 할 수 있다. 오탈자 방지 가능.
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILRE = 'ADD_POST_FAILRE';

export const REMOVE_POST_REQUEST = 'REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILRE = 'REMOVE_POST_FAILRE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILRE = 'ADD_COMMENT_FAILRE';

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});

export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initalState, action) => {
  switch (action.type) {
    //= ==============POST ADD
    case ADD_POST_REQUEST:
      return {
        ...state,
        addPostLoading: true,
        addPostError: null,
        addPostDone: false,
      };
    case ADD_POST_SUCCESS:
      return {
        ...state,
        mainPosts: [dummyPost(action.data), ...state.mainPosts],
        addPostLoading: false,
        addPostDone: true,
      };
    case ADD_POST_FAILRE:
      return {
        ...state,
        addPostLoading: false,
        addPostError: action.error
      };
      //= ==============POST REMOVE
    case REMOVE_POST_REQUEST:
      return {
        ...state,
        removePostLoading: true,
        removePostError: null,
        removePostDone: false,
      };
    case REMOVE_POST_SUCCESS:
      return {
        ...state,
        mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        removePostLoading: false,
        removePostDone: true,
      };
    case REMOVE_POST_FAILRE:
      return {
        ...state,
        removePostLoading: false,
        removePostError: action.error
      };
      //= ==============COMMENT
    case ADD_COMMENT_REQUEST:
      return {
        ...state,
        addCommentLoading: true,
        addCommentDone: null,
        addCommentError: false,
      };
    case ADD_COMMENT_SUCCESS: {
      /*
      받아오는 데이터 :  action.data.content , action.data.postId, action.data.userId
      */
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      const post = { ...state.mainPosts[postIndex] };
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      const mainPosts = [...state.mainPosts];
      mainPosts[postIndex] = post;
      return {
        ...state,
        mainPosts,
        addCommentLoading: false,
        addCommentDone: true,
      };
    }
    case ADD_COMMENT_FAILRE:
      return {
        ...state,
        addCommentLoading: false,
        addCommentError: action.error
      };
    default:
      return state;
  }
};

export default reducer;
