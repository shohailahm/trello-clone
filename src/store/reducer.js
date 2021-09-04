import { boards } from "../utils/mockData";
import { ADD_BOARD_SUCCESS } from "./actions";

/* 
import default from './reducer';
import { ADD_BOARD_SUCCESS } from './actions';
this is just to demonstrate how a reducer function works 

   */
const defaultstate = {
  data: [],
  boards: [],
};
export default (state = {}, action) => {
  switch (action.type) {
    case ADD_BOARD_SUCCESS:
      return {
        ...state,
        boards: [...boards, action.payload],
      };
    default:
      return state;
  }
};
