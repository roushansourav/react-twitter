import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import SearchBar from "./search";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getTweets, getUsers, setSearch } from "../redux/actions";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

function Home(props) {
  const {
    getTweets,
    suggestions = {},
    getUsers,
    search = "",
    setSearch,
  } = props;
  const history = useHistory();
  const [suggestionFlag, setSuggestionFlag] = useState(false);

  const debounceSearch = React.useRef(
    _.debounce((search) => {
      search.length >= 1 && getUsers(search);
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
    search.length > 1 && history.push("/tweets");
  };

  const onClickSuggestionHandler = (val, userId) => {
    setSearch(val);
    setSuggestionFlag(false);
    search.length >= 1 && getTweets(userId);
    history.push("/tweets");
  };

  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <SearchBar
        home
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
  );
}
Home.propTypes = {
  getTweets: PropTypes.func,
  suggestions: PropTypes.object,
  getUsers: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
const mapStateToProps = ({ users, search }) => ({
  suggestions: users,
  search: search.search,
});

export default connect(mapStateToProps, (dispatch) =>
  bindActionCreators({ getTweets, getUsers, setSearch }, dispatch)
)(Home);
