import axios from "axios";
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

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADM_LIST_REQUEST,
    });

    // const {
    //   userLogin: { userInfo },
    // } = getState();

    // const config = {
    //   headers: {
    // Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const { data } = await axios.get(
      "/api/adm/pendingusers"
      // config
    );

    dispatch({
      type: ADM_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ADM_LIST_FAIL,
      payload: message,
    });
  }
};

export const listStuAch = (sid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: STU_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    // const config = {
    //   headers: {
    //     // Authorization: `Bearer ${userInfo.token}`,
    //   },
    // };

    const { data } = await axios.get(
      `/api/adm/ach/${sid}`
      // config
    );

    dispatch({
      type: STU_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: STU_LIST_FAIL,
      payload: message,
    });
  }
};

export const evaluateAch =
  (id, achStatus, user_sid) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADM_EVAL_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/adm/eval/${id}`,
        { achStatus, user_sid },
        config
      );

      dispatch({
        type: ADM_EVAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ADM_EVAL_FAIL,
        payload: message,
      });
    }
  };
