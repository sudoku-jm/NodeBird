// import { nanoid } from 'nanoid';
import produce from 'immer';
// import faker from 'faker';

export const initalState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePosts: true, // 데이터 더이상 불러 올게 없을 경우 false
  likePostLoading: false, // LIKE POST
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false, // UNLIKE POST
  unlikePostDone: false,
  unlikePostError: null,
  loadPostsLoading: false, // 데이터 로드 시도
  loadPostsDone: false,
  loadPostsError: null,
  addPostLoading: false, // 게시글 작성 시도
  addPostDone: false,
  addPostError: null,
  removePostLoading: false, // 게시글 삭제 시도
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false, // 코멘트 작성 시도
  addCommentDone: false,
  addCommentError: null,
};

// export const generateDummyPost = (number) => Array(number).fill().map(() => ({
//   id: nanoid(),
//   User: {
//     id: nanoid(),
//     nickname: faker.name.findName(),
//   },
//   content: faker.lorem.paragraph(),
//   Images: [{
//     src: faker.image.image()
//     // src: 'https://picsum.photos/seed/picsum/200/300'
//   }],
//   Comments: [{
//     User: {
//       id: nanoid(),
//       nickname: faker.name.findName()
//     },
//     content: faker.lorem.sentence(),
//   }],
// }));

// 더미데이터 추가 faker
// initalState.mainPosts = initalState.mainPosts.concat(
//   generateDummyPost(10)
// );

// 액션 이름을 상수로 뺌. switch case에서 const값을 재활용 할 수 있다. 오탈자 방지 가능.
export const LIKE_POST_REQUEST = 'LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'LIKE_POST_SUCCESS';
export const LIKE_POST_FAILRE = 'LIKE_POST_FAILRE';

export const UNLIKE_POST_REQUEST = 'UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILRE = 'UNLIKE_POST_FAILRE';

export const LOAD_POSTS_REQUEST = 'LOAD_POSTS_REQUEST'; // 화면 로드
export const LOAD_POSTS_SUCCESS = 'LOAD_POSTS_SUCCESS'; // 화면 로드 성공
export const LOAD_POSTS_FAILRE = 'LOAD_POSTS_FAILRE'; // 화면 로드 실패

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
  data: data.post.id
});

export const addComment = (data) => ({
  type: ADD_COMMENT_REQUEST,
  data,
});

const reducer = (state = initalState, action) => {
  return produce(state, (d) => {
    const draft = d;
    switch (action.type) {
      //= ============== UNLIKE POST
      case UNLIKE_POST_REQUEST:
        draft.unlikePostLoading = true;
        draft.unlikePostError = null;
        draft.unlikePostDone = false;
        break;
      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers = post.Likers.filter((v) => v.id === action.data.Postid);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }
      case UNLIKE_POST_FAILRE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.error;
        break;
      //= ============== LIKE POST
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostError = null;
        draft.likePostDone = false;
        break;
      case LIKE_POST_SUCCESS: {
        // action.data가 넘어온다.
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILRE:
        draft.likePostLoading = false;
        draft.likePostError = action.error;
        break;
      //= ============== LOAD POST
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsError = null;
        draft.loadPostsDone = false;
        break;
      case LOAD_POSTS_SUCCESS:
        // action.data 기존데이터 + concat으로 불러오는 데이터 합쳐주기
        draft.mainPosts = action.data.concat(draft.mainPosts);
        draft.hasMorePosts = draft.mainPosts.length < 50; // 50개미만 true
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        break;
      case LOAD_POSTS_FAILRE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.error;
        break;
      //= ==============POST ADD
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostError = null;
        draft.addPostDone = false;
        break;
      case ADD_POST_SUCCESS:
        // draft.mainPosts.unshift(dummyPost(action.data));
        draft.mainPosts.unshift(action.data); // 실제 데이터로 넣어줌.
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = [];
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
        draft.mainPosts = draft.mainPosts.filter((v) => v.id !== action.data.PostId);
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
        // const post = draft.mainPosts.find((v) => v.id === action.data.postId);
        // post.Comments.unshift(dummyComment(action.data.content));
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
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
