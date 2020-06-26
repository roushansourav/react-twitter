import { SET_SEARCH } from "./../actions/actionTypes";

const initialState = {
  search: "",
};

export const search = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH:
      return { ...state, search: action.search };
    default:
      return state;
  }
};
