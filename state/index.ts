import {
  applyMiddleware,
  createStore,
  combineReducers
} from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

import TestReducer from "state/ducks/Test";

const Reducers = combineReducers({
  test: TestReducer
});

const middleware: any[] = [
  thunk
];

const composeEnhancers = composeWithDevTools({
  trace: true,
  traceLimit: 25
});

export const InitializeStore = (initialState = {}) => {
  return createStore(
    Reducers,
    initialState,
    (process.env.NODE_ENV === "production") 
      ? applyMiddleware(...middleware) 
      : composeEnhancers(applyMiddleware(...middleware))
  );
};

export const StoreWrapper = createWrapper(
  InitializeStore,
  {
    debug: false
  }
);
