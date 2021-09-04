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

export const ADD_TASK_SUCCESS = "ADD_TASK_SUCCESS";
export const addTASKS = (obj) => {
  return (dispatch) => {
    Promise.resolve(obj).then((res) => {
      dispatch({ type: ADD_TASK_SUCCESS, data: res });
    });
  };
};

export const DELETE_TASK_SUCCESS = "DELETE_TASK_SUCCESS";
export const DELETETASKS = (id) => {
  return (dispatch) => {
    Promise.resolve(id).then((res) => {
      dispatch({ type: DELETE_TASK_SUCCESS, data: res });
    });
  };
};

export const SET_ITEMS_SUCCESS = "SET_ITEM_SUCCESS";
export const setItems = (data) => {
  return (dispatch) => {
    Promise.resolve(data).then((res) => {
      dispatch({ type: SET_ITEMS_SUCCESS, data: res });
    });
  };
};
