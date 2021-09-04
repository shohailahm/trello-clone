/*action that dispatches an event to respective reducer */

import { uniqueId } from "../utils/utils";

export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const addBoard = (name) => {
  return (dispatch) => {
    Promise.resolve({ name, id: uniqueId() }).then((res) => {
      dispatch({ type: ADD_BOARD_SUCCESS, data: res });
    });
  };
};
