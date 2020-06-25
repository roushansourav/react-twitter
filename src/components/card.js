import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";
import RepeatIcon from "@material-ui/icons/Repeat";

function Card(props) {
  const {
    user,
    created_at: postedAt,
    retweet_count: retweetCount,
    text: content,
  } = props;
  const { profile_image_url: profileImg, screen_name: username, name } = user;

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper style={{ padding: "1rem" }}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container>
              <Grid item style={{ height: "50px", width: "50px" }}>
                <img
                  src={profileImg}
                  alt="pic"
                  style={{ borderRadius: "50%" }}
                />
              </Grid>
              <Grid item style={{ width: "calc(100% - 50px)" }}>
                <Grid container justify="space-between">
                  <Grid item xs={7} style={{ margin: "0 1rem" }}>
                    <Grid container>
                      <Grid item xs={12}>
                        <Typography
                          style={{ fontSize: "18px", fontWeight: "600" }}
                        >
                          {name}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          style={{ fontSize: "18px" }}
                        >{`@${username}`}</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={3}>
                    <Grid container>
                      <Typography
                        align="right"
                        style={{ width: "100%", fontSize: "12px" }}
                      >
                        {new Date(postedAt).toDateString().slice(4, 15)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              margin: "0.8rem 0",
              minHeight: "80px",
              maxHeight: "220px",
            }}
          >
            <Typography style={{ fontSize: "14px" }}>{content}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={4}>
                <Typography
                  style={{ fontSize: "12px", display: "inline-block" }}
                >
                  <RepeatIcon
                    style={{
                      display: "inline-block",
                      marginBottom: "-2px",
                      width: "30px",
                      transform: "rotate(90deg)",
                      fontSize: "14px",
                      color: "#707070",
                    }}
                  />
                  {retweetCount}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography></Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
}

export default Card;
