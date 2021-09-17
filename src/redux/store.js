import {
  createStore,
  combineReducers,
  applyMiddleware
} from "redux";
import thunk from "redux-thunk";
import {
  composeWithDevTools
} from "redux-devtools-extension";


import {
  AuthReducer
} from "./reducers/AuthReducer";
import {
  ChatReducer,
} from "./reducers/ChatReducer"

import {
  CardsReducer
} from "./reducers/CardsReducer";


const reducer = combineReducers({
  Auth: AuthReducer,
  Chat: ChatReducer,
  Cards: CardsReducer
});

const middleware = [thunk];


const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;