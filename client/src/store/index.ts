import { createStore, applyMiddleware } from "redux";
import { useSelector } from "react-redux";
import thunk from "redux-thunk";
import reducers from "../reducers";
// Redux Dev tools import
import { composeWithDevTools } from "@redux-devtools/extension";

const enhancer = composeWithDevTools(applyMiddleware(thunk));
export const store = createStore(reducers, enhancer);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
