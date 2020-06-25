import React from "react";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Typography, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Button from './button';
import SearchIcon from "@material-ui/icons/Search";
import clsx from "clsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory } from "react-router-dom";

const styles = makeStyles(theme=>({
  bootstrapColor: {
    color: "#00acee",
  },
  gColor:{
    color:'#707070',
  },
  icon: {
    fontSize: "100px",
  },
  sFontSize:{
    fontSize:'20px'
  },
  textMsg: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "600",
    fontSize:props=>props.home?'36px':'26px',
  },
  formControl: {
    margin: "auto",
    border: "2px solid #707070",
    borderRadius: "8px",
  },
  listItem: {
    padding: 0,
    cursor: "pointer",
    "& :hover": {
      backgroundColor: "rgba(0,0,0,0.25)",
    },
  },
  listText: {
    fontWeight: "600",
    margin: 0,
    padding: "0.25rem 3rem",
    borderRadius: "0.25rem",
  },
  suggestionContent: {
    position: "absolute",
    width: "100%",
    backgroundColor: "rgb(250,250,250)",
    display: "block",
    zIndex: "1",
    borderRadius: "0 0 8px 8px",
  },
  suggestionContainer:{
    position: "relative",
    width: "100%",
  },
  suggestionContentHide: {
    display: "none",
  },
  containerText:{
    [theme.breakpoints.up('lg')]:{
      width: props => props.home?'59%':'20%',
    },
    [theme.breakpoints.down('md')]:{
      width:'66%',
    },
    [theme.breakpoints.down('sm')]:{
      width:'91%',
    },    
  },
  searchInput:{
    [theme.breakpoints.up('lg')]:{
      width: props => props.home?'59%':'50%',
      margin:props =>props.home?0:'0 2rem 0 6rem',
    },
    [theme.breakpoints.down('md')]:{
      width:'91%',
    }, 
  },
  containerButton:{
    [theme.breakpoints.up('lg')]:{
      width: props => props.home?'59%':'10%',
    },
    [theme.breakpoints.down('md')]:{
      width:'66%',
    },
    [theme.breakpoints.down('sm')]:{
      width:'91%',
    },    
  },
  container:{
    margin: "0.5rem",
    justifyContent:'flex-start',
    [theme.breakpoints.down('md')]:{
      justifyContent:'space-around',
    },
  }
}));

function SearchBar(props) {
  const classes = styles(props);
  const { search, suggestion, onChangeHandler, onClickSearchHandler,onClickSuggestionHandler,suggestionFlag } = props;
  const history = useHistory();
  const onClickHandler=()=>{
    history.push('/tweets');
  }
  console.log(props);
  return (
    <Grid container className={classes.container} alignItems='center'>
      <Grid item className={classes.containerText}>
        <Typography align="center" variant="h5" className={classes.textMsg}>
          TWEET
          <TwitterIcon className={clsx(classes.bootstrapColor, classes.icon)} />
          SEARCH
        </Typography>
      </Grid>
      <Grid item container className={classes.searchInput}>
        <FormControl
          fullWidth
          variant="outlined"
          className={classes.formControl}
        >
          <OutlinedInput
            id="outlined-search"
            value={search}
            onChange={onChangeHandler}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon className={classes.gColor} />
              </InputAdornment>
            }
            className={clsx(classes.gColor,classes.sFontSize)}
            inputProps={{ style: { padding: "10px 14px" } }}
          />
        </FormControl>
        {suggestion && suggestionFlag && (
          <Grid className={classes.suggestionContainer}>
            <Grid className={suggestion?classes.suggestionContent:classes.suggestionContentHide}>
              <List>
                {suggestion?.slice(0, 5)?.map((s) => (
                  <ListItem
                    key={s.name}
                    className={classes.listItem}
                    onClick={onClickSuggestionHandler?(e)=>onClickSuggestionHandler(s.name,s.screen_name) : (() => history.push("/tweets"))}
                  >
                    <ListItemText
                      disableTypography
                      primary={s.name}
                      className={clsx(classes.listText,classes.gColor,classes.sFontSize)}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        )}
      </Grid>
      <Grid item className={classes.containerButton}>
        <Button
          home={props.home}
          variant="contained"
          color="primary"
          disableRipple
          className={classes.button}
          onClick={onClickSearchHandler || onClickHandler}
        >
          SEARCH
        </Button>
      </Grid>
    </Grid>
  );
}

export default SearchBar;
