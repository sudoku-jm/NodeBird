import { nanoid } from 'nanoid';
import produce from 'immer';

export const initalState = {
  mainPosts: [{
    id: 1,
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
  return produce(state, (draft) => {
    switch (action.type) {
      //= ==============POST ADD
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(dummyPost(action.data));
        draft.addPostLoading = false;
        draft.addPostDone = true;
        break;
      case ADD_POST_FAILRE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      //= ==============POST REMOVE
      case REMOVE_POST_REQUEST:
        draft.emovePostLoading = true;
        draft.removePostError = null;
        draft.removePostDone = false;
        break;
      case REMOVE_POST_SUCCESS:
        // mainPosts: state.mainPosts.filter((v) => v.id !== action.data),
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILRE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      //= ==============COMMENT
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = null;
        draft.addCommentError = false;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        post.Comments.unshift(dummyComment(action.data.content));
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
        // const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
        // const post = { ...state.mainPosts[postIndex] };
        // post.Comments = [dummyComment(action.data.content), ...post.Comments];
        // const mainPosts = [...state.mainPosts];
        // mainPosts[postIndex] = post;
        // return {
        //   ...state,
        //   mainPosts,
        //   addCommentLoading: false,
        //   addCommentDone: true,
        // };
      }
      case ADD_COMMENT_FAILRE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
};

export default reducer;
