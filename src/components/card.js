import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import RepeatIcon from "@material-ui/icons/Repeat";
import numberFormat from "../utilities/numberFormat";
import CommentIcon from "./commentIcon";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  paper: {
    padding: "1rem",
  },
  imgContainer: {
    height: "50px",
    width: "50px",
  },
  img: {
    borderRadius: "50%",
  },
  nameContainer: {
    width: "calc(100% - 50px)",
  },
  sFont: {
    fontSize: "18px",
  },
  bFont: {
    fontWeight: "600",
  },
  fullWidth: {
    width: "100%",
  },
  smallFont: {
    fontSize: "12px",
  },
  desc: {
    margin: "0.8rem 0",
    minHeight: "80px",
    maxHeight: "220px",
    overflow: "hidden",
  },
  mediumFont: {
    fontSize: "14px",
  },
  inlineBlock: {
    display: "inline-block",
  },
  retweetIcon: {
    display: "inline-block",
    marginBottom: "-2px",
    width: "20px",
    transform: "rotate(90deg)",
    fontSize: "14px",
    color: "#707070",
  },
  overFlow: {
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
    "& :hover": {
      overflowX: "scroll",
      textOverflow: "unset",
    },
  },
}));

function Card(props) {
  const {
    user = {},
    created_at: postedAt = new Date(),
    retweet_count: retweetCount = 0,
    text: content = "",
  } = props;
  const classes = styles();
  const { profile_image_url: profileImg, screen_name: username, name } = user;
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item className={classes.imgContainer}>
                <img src={profileImg} alt="pic" className={classes.img} />
              </Grid>
              <Grid item className={classes.nameContainer}>
                <Grid container justify="space-between">
                  <Grid item xs={7} style={{ margin: "0 1rem" }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          className={clsx(
                            classes.sFont,
                            classes.bFont,
                            classes.overFlow
                          )}
                        >
                          {name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          className={clsx(classes.sFont, classes.overFlow)}
                        >{`@${username}`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container>
                      <Typography
                        align="right"
                        className={clsx(classes.fullWidth, classes.smallFont)}
                      >
                        {new Date(postedAt).toDateString().slice(4, 15)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className={classes.desc}>
            <Typography className={classes.mediumFont}>{content}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={2}>
                <Typography
                  className={clsx(classes.smallFont, classes.inlineBlock)}
                >
                  <CommentIcon />
                  {numberFormat(retweetCount)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  className={clsx(classes.smallFont, classes.inlineBlock)}
                >
                  <RepeatIcon className={classes.retweetIcon} />
                  {numberFormat(retweetCount)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}
Card.propTypes = {
  user: PropTypes.object,
  created_at: PropTypes.string,
  retweet_count: PropTypes.number,
  text: PropTypes.string,
};
export default Card;
