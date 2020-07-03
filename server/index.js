//Dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
//Local imports
const {
  call,
  SEARCH_TWEETS_URL,
  SEARCH_USER_URL,
  BASE_URL,
  STATUS_USER_URL,
} = require("./helper");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use("/static", express.static(path.join(__dirname, "../build/static")));

app.get("/api/tweets", (req, res) => {
  const query = req.query.q || '';
  if (query.startsWith("#")) {
    call(
      BASE_URL,
      SEARCH_TWEETS_URL.replace("{search}", encodeURIComponent(query)),
      (error, data, response) => {
        if (error) {
          res.status(500).json({ err: error, payload: null });
          return;
        }
        if (data) res.json({ err: null, payload: JSON.parse(data).statuses });
      }
    );
  } else {
    call(
      BASE_URL,
      STATUS_USER_URL.replace("{id}", encodeURIComponent(query)),
      (error, data, response) => {
        if (error) {
          res.status(500).json({ err: error, payload: null });
          return;
        }
        if (data) res.json({ err: null, payload: JSON.parse(data) });
      }
    );
  }
});

app.get("/api/users", (req, res) => {
  const query = req.query.q;
  call(
    BASE_URL,
    SEARCH_USER_URL.replace("{search}", encodeURIComponent(query)),
    (error, data, response) => {
      if (error) {
        res.status(500).json({ err: error, payload: null });
        return;
      }
      if (data) res.json({ err: null, payload: JSON.parse(data) });
    }
  );
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
app.get("/*", (req, res) => {
  //res.send('server is running');
  res.sendFile(path.join(__dirname, "../build/index.html"));
});
app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
