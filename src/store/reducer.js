import {
  ADD_BOARD_SUCCESS,
  ADD_TASK_SUCCESS,
  DELETE_TASK_SUCCESS,
  SET_ITEMS_SUCCESS,
} from "./actions";

/* 
import default from './reducer';
import { ADD_BOARD_SUCCESS, DELETE_TASK_SUCCESS } from './actions';
this is just to demonstrate how a reducer function works 

   */
const defaultstate = {
  data: [],
  boards: [],
};
export default (state = defaultstate, action) => {
  switch (action.type) {
    case ADD_BOARD_SUCCESS:
      return {
        ...state,
        boards: [...state.boards, action.data],
      };
    case ADD_TASK_SUCCESS:
      return {
        ...state,
        data: [...state.data, action.data],
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        data: state.data.filter((ite) => ite.id !== action.data),
      };
    case SET_ITEMS_SUCCESS:
      debugger;
      return {
        ...state,
        data: action.data,
      };
    default:
      return state;
  }
};
