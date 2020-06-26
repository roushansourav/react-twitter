import React from "react";
import { Grid } from "@material-ui/core";
import Card from "./card";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import MsgContainer from "./msgContainer";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  container: {
    padding: " 2rem",
    backgroundColor: "rgb(0,0,0,0.05)",
  },
  conPadding: {
    padding: "0 1rem",
  },
}));

export default function Tweets(props) {
  const classes = styles();
  const { tweets = [], search = "", suggestions = [] } = props;
  const { ld_tweets, er_tweets, tweets: tweetsData } = tweets;
  if (er_tweets) {
    return (
      <MsgContainer
        msg={"Sorry, something happened from our side. We will come back soon."}
      />
    );
  }
  if (ld_tweets) {
    return <CircularProgress />;
  }
  if (!tweetsData?.length) {
    if (search || suggestions.length) {
      return <MsgContainer msg={"No tweet found"} />;
    } else return null;
  }
  return (
    <Grid item xs={12} className={classes.container}>
      <Grid container spacing={3} className={classes.conPadding}>
        {tweetsData.map((t) => (
          <Card key={t.id} {...t} />
        ))}
      </Grid>
    </Grid>
  );
}

Tweets.propTypes = {
  tweets: PropTypes.array,
  search: PropTypes.string,
  suggestions: PropTypes.array,
};
