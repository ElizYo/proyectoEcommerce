import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import Productodesc from "./pages/productodesc";
import Cart from "./pages/cart";

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <Router>
          <div>
            <NavigationContainer/>

            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/product/:id" component={Productodesc} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}