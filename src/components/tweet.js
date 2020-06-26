import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "./search";
import _ from "lodash";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTweets, getUsers, setSearch } from "../redux/actions";
import Tweets from "./tweets";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  searchContainer: {
    height: "120px",
    [theme.breakpoints.down("md")]: {
      height: "250px",
    },
  },
}));

function Tweet(props) {
  const {
    getTweets,
    suggestions = {},
    getUsers,
    search = "",
    tweets = [],
    setSearch,
  } = props;
  const [suggestionFlag, setSuggestionFlag] = useState(false);
  const classes = styles();

  const debounceSearch = React.useRef(
    _.debounce((search) => {
      getUsers(search);
    }, 200)
  );

  const onChangeHandler = (e) => {
    e.persist();
    let searchString = e.target.value;
    setSearch(searchString);
    if (searchString && !searchString.startsWith("#")) {
      setSuggestionFlag(true);
      debounceSearch.current(searchString);
    } else {
      if (suggestionFlag) setSuggestionFlag(false);
    }
  };

  const onClickSearchHandler = (e) => {
    search.length > 1 && getTweets(search);
    setSuggestionFlag(false);
  };

  const onClickSuggestionHandler = (val, userId) => {
    setSearch(val);
    setSuggestionFlag(false);
    search.length >= 1 && getTweets(userId);
  };

  return (
    <Grid container>
      <Grid item container xs={12} className={classes.searchContainer}>
        <SearchBar
          {...{
            suggestions: suggestions.users,
            search,
            onChangeHandler,
            onClickSearchHandler,
            onClickSuggestionHandler,
            suggestionFlag,
          }}
        />
      </Grid>
      <Tweets tweets={tweets} search={search} suggestions={suggestions.users} />
    </Grid>
  );
}

const mapStateToProps = ({ users, tweets, search }) => ({
  suggestions: users,
  tweets,
  search: search.search,
});
Tweet.propTypes = {
  getTweets: PropTypes.func,
  suggestions: PropTypes.object,
  getUsers: PropTypes.func,
  search: PropTypes.string,
  tweets: PropTypes.object,
  setSearch: PropTypes.func,
};
export default connect(mapStateToProps, (dispatch) =>
  bindActionCreators({ getTweets, getUsers, setSearch }, dispatch)
)(Tweet);
