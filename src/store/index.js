import rootReducer from "./reducer/index";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { persistStore, persistReducer } from "redux-persist";
import { ENABLE_REDUX_DEV_TOOLS } from "../constants";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

const enhancer = compose(applyMiddleware(thunk, logger));

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, enhancer);
export let persistor = persistStore(store);

export default store;