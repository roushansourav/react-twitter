import { FETCH_TWEETS } from "./../actions/actionTypes";

const L = "_LOADING";
const F = "_FAILED";

const initialState = {
  ld_Tweets: false,
  er_Tweets: null,
  tweets: [],
};

export const tweets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TWEETS + L:
      return { ...state, ld_tweets: true, er_tweets: null };
    case FETCH_TWEETS:
      return {
        ...state,
        ld_tweets: false,
        er_tweets: null,
        tweets: action.tweets,
      };
    case FETCH_TWEETS + F:
      return { ...state, ld_tweets: false, er_tweets: action.error };
    default:
      return state;
  }
};
