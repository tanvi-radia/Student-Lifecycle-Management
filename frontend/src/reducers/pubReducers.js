import {
  PUB_FETCH_FAIL,
  PUB_FETCH_REQUEST,
  PUB_FETCH_SUCCESS,
} from "../constants/pubConstants";

export const pubFetchReducer = (state = { pubList: [] }, action) => {
  switch (action.type) {
    case PUB_FETCH_REQUEST:
      return { loading: true };
    case PUB_FETCH_SUCCESS:
      return { loading: false, pubList: action.payload };
    case PUB_FETCH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
