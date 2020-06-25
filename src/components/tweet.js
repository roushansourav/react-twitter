import React, { useState } from "react";
import { Grid, Typography } from "@material-ui/core";
import SearchBar from "./search";
import _ from "lodash";
import axios from "axios";
import Card from './card';
import { makeStyles } from "@material-ui/core/styles";

const styles = makeStyles(theme=>({
  searchContainer:{
    height:'120px',
    [theme.breakpoints.down('md')]:{
      height: "250px",
    },
  }
}));

function Tweets() {
  const [search, setSearch] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [suggestionFlag, setSuggestionFlag] = useState(false);
  const [tweets,setTweets]=useState([]);
  const classes=styles();
  const debounceSearch = React.useRef(
    _.debounce((search) => {
      console.log(search);
      search.length >= 1 &&
        axios
          .get(`http://localhost:4000/users?q=${encodeURIComponent(search)}`)
          .then((res) => {
            if (!search.startsWith("#")) setSuggestion(res.data.payload);
            console.log(res.data);
          })
          .catch((err) => console.error(err));
    }, 500)
  );

  const onChangeHandler = (e) => {
    e.persist();
    let searchString = e.target.value;
    setSuggestionFlag(true);
    setSearch(searchString);
    if (!!searchString) debounceSearch.current(searchString);
  };
  const onClickSearchHandler = (e) => {
    search.length >= 1 &&
      axios
        .get(`http://localhost:4000/tweets?q=${encodeURIComponent(search)}`)
        .then((res) => {
          console.log(res.data);
          setTweets(res.data.payload.statuses);
        });
  };
  const onClickSuggestionHandler = (val,username) => {
    setSearch(val);
    setSuggestionFlag(false);
    search.length >= 1 &&
      axios
        .get(`http://localhost:4000/tweets?q=${encodeURIComponent('from:' + username)}`)
        .then((res) => {
          console.log(res.data);
          setTweets(res.data.payload.statuses);
        });
  };
  return (
    <Grid container>
      <Grid item container xs={12} className={classes.searchContainer}>
        <SearchBar
          {...{
            suggestion,
            search,
            onChangeHandler,
            onClickSearchHandler,
            onClickSuggestionHandler,
            suggestionFlag,
          }}
        />
      </Grid>
      {tweets.length? <Grid item xs={12} style={{padding: " 2rem 1rem",backgroundColor:'rgb(0,0,0,0.05)'}}>
        <Grid container justify="center" spacing={3} style={{padding:'0 1rem'}}>
          {tweets.map(t=><Card key={t.id} {...t}/>)}
        </Grid>
      </Grid>:
      <Typography align='center' style={{width:'100%'}}>Sorry,No tweets founds</Typography>
      }
    </Grid>
  );
}

export default Tweets;
