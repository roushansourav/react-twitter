import { FETCH_TWEETS, FETCH_USERS, SET_SEARCH } from "./actionTypes";
import axios from "axios";
const L = "_LOADING";
const F = "_FAILED";

//Tweets actions

export const getTweets = (search) => {
  return (dispatch) => {
    //Loading
    dispatch({ type: FETCH_TWEETS + L });
    axios
      .get(`/api/tweets?q=${encodeURIComponent(search)}`)
      .then((res) => {
        dispatch({ type: FETCH_TWEETS, tweets: res.data.payload });
      })
      .catch((error) => {
        dispatch({ type: FETCH_TWEETS + F, error });
      });
  };
};

// Users actions
export const getUsers = (search) => {
  return (dispatch) => {
    //Loading
    dispatch({ type: FETCH_USERS + L });
    axios
      .get(`/api/users?q=${encodeURIComponent(search)}`)
      .then((res) => {
        dispatch({ type: FETCH_USERS, users: res.data.payload });
      })
      .catch((error) => {
        dispatch({ type: FETCH_USERS + F, error });
      });
  };
};

//Set seacrh key in state
export const setSearch = (val) => {
  return (dispatch) => {
    dispatch({ type: SET_SEARCH, search: val });
  };
};
