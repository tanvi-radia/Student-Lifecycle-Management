import axios from "axios";
import {
  PUB_FETCH_FAIL,
  PUB_FETCH_REQUEST,
  PUB_FETCH_SUCCESS,
} from "../constants/pubConstants";

export const fetchPub = (sid) => async (dispatch) => {
  try {
    dispatch({
      type: PUB_FETCH_REQUEST,
    });

    const { data } = await axios.get(`/api/pub/${sid}`);

    dispatch({
      type: PUB_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PUB_FETCH_FAIL,
      payload: message,
    });
  }
};
