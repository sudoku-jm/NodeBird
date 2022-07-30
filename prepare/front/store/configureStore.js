import { createWrapper } from "next-redux-wrapper";
import { createStore } from "redux";

import reducer from '../reducers'

const configureStore = () => {
  const store = createStore(reducer);

  //dispatch 하는 순간 type과 data가 reducer로 전달된다. 그리고 초기state에서 다음 state가 생성된다.
  store.dispatch({
    type : 'CHAGNE_NICKNAME',
    data : 'boogicho',
  })

  return store;
};
const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
}); //두번째는 옵션객체

export default wrapper;
