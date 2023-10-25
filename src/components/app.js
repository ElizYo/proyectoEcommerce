import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import Productodesc from "./pages/productodesc";
import Cart from "./pages/cart";
import Register from "./pages/register";
import Login from "./pages/login";

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
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}