import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";

const styles = makeStyles((theme) => ({
  root: {
    display: "block",
    margin: "auto",
    marginTop: (props) => (props.home ? "2rem" : "0"),
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "0.5rem 2rem",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#00acee",
    borderColor: "#00acee",
    borderRadius: "0.5rem",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#00acee",
      borderColor: "#00acee",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
}));
function BootStrapButton(props) {
  const classes = styles(props);
  const { home, ...rest } = props;
  return <Button classes={{ root: classes.root }} {...rest} />;
}
BootStrapButton.propTypes = {
  home: PropTypes.bool,
};
export default BootStrapButton;
