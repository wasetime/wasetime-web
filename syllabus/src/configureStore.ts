import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";

import { loadState } from "./localForage";

import rootReducer from "./redux/reducers";

const configureStore = async () => {
  const middlewares = [thunk];
  if (process.env.NODE_ENV !== "production") {
    middlewares.push(logger);
  }
  try {
    const preloadedState = await loadState();
    return createStore(
      rootReducer,
      preloadedState,
      applyMiddleware(...middlewares)
    );
  } catch (error) {
    console.error(error);
    return createStore(rootReducer, undefined, applyMiddleware(...middlewares));
  }
};

export default configureStore;
