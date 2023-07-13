import {
  ADM_EVAL_FAIL,
  ADM_EVAL_REQUEST,
  ADM_EVAL_SUCCESS,
  ADM_LIST_FAIL,
  ADM_LIST_REQUEST,
  ADM_LIST_SUCCESS,
  STU_LIST_FAIL,
  STU_LIST_REQUEST,
  STU_LIST_SUCCESS,
} from "../constants/adminConstants";

export const userListReducer = (state = { pendingUsers: [] }, action) => {
  switch (action.type) {
    case ADM_LIST_REQUEST:
      return { loading: true };
    case ADM_LIST_SUCCESS:
      return { loading: false, pendingUsers: action.payload };
    case ADM_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const evaluateReducer = (state = {}, action) => {
  switch (action.type) {
    case ADM_EVAL_REQUEST:
      return { loading: true };
    case ADM_EVAL_SUCCESS:
      return { loading: false, success: true };
    case ADM_EVAL_FAIL:
      return { loading: false, success: false, error: action.payload };
    default:
      return state;
  }
};

export const stuAchListReducer = (state = { achList: [] }, action) => {
  switch (action.type) {
    case STU_LIST_REQUEST:
      return { loading: true };
    case STU_LIST_SUCCESS:
      return { loading: false, achsList: action.payload };
    case STU_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
