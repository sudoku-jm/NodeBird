export const initalState = {
  mainPosts : [{
    id : 1,
    User : {
      id : 1,
      nickname : 'jm'
    },
    content : '첫 번째 게시글 #해시태그 #익스프레스',
    Images : [
      {
      src : 'https://images.unsplash.com/photo-1659114538192-0f8caaaaa698?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
      },
      {
        src : 'https://images.unsplash.com/photo-1657299156528-2d50a9a6a444?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80'
      },
      {
        src : 'https://images.unsplash.com/photo-1659204622556-148a4346af00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
      }
    ],
    Comments : [
      {
        User : {
          nickname : 'nero',
        },
        content : '안녕 반가워요',
      },
      {
        User : {
          nickname : 'jm',
        },
        content : '댓글은 이렇게 다는건가?',
    }],
  }],
  imagePaths : [],
  postAdded : false,  //게시글 추가 완료시 true
}

//액션 이름을 상수로 뺌. switch case에서 const값을 재활용 할 수 있다. 오탈자 방지 가능.
const ADD_POST = 'ADD_POST';
export const addPost = {
  type : ADD_POST,
}

const dummyPost = {
  id : 2,
  content : '더미데이터입니다',
  User : {
    id : 1,
    nickname : '미니미니'
  },
  Images : [],
  Comments : [],
}

const reducer = (state = initalState, action) => {
  switch(action.type){
      case ADD_POST : 
        return {
          ...state,
          mainPosts : [dummyPost, ...state.mainPosts],
          postAdded : true,
        }
      default : 
        return state;
  }
}

export default reducer;