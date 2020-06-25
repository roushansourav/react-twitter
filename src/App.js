import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Tweet from "./components/tweet";
import store from "./redux";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/tweets" component={Tweet} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
