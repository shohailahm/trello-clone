/*
this is to demonstarte how store is setup and wrapped around the app in the provider
combineReducer
setup store with reducers and middlewear(thunk or saga)*/
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducer from "./reducer";

const store = createStore(reducer, compose(applyMiddleware(thunk)));

export default store;
