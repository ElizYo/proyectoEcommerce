import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import productodesc from "./pages/productodesc";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={productodesc} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}