import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  container: {
    padding: " 2rem",
    backgroundColor: "rgb(0,0,0,0.05)",
  },
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: "50vh",
  },
  msgContainer: {
    margin: "auto",
    textAlign: "center",
    color: "red",
    fontSize: "2rem",
  },
}));

function MsgContainer(props) {
  const classes = styles();
  const { msg } = props;
  return (
    <Grid
      item
      xs={12}
      container
      className={clsx(classes.container, classes.emptyContainer)}
    >
      <Grid item xs={12} className={classes.msgContainer}>
        {msg}
      </Grid>
    </Grid>
  );
}
MsgContainer.propTypes = {
  msg: PropTypes.string,
};
export default MsgContainer;
