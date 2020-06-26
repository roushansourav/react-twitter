import { FETCH_USERS } from "./../actions/actionTypes";

const L = "LOADING";
const F = "FAILED";

const initialState = {
  ld_users: false,
  er_users: null,
  users: [],
};

export const users = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS + L:
      return { ...state, ld_users: true, er_users: null };
    case FETCH_USERS:
      return { ...state, ld_users: false, er_users: null, users: action.users };
    case FETCH_USERS + F:
      return { ...state, ld_users: false, er_users: action.error };
    default:
      return state;
  }
};
