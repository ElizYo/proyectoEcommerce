import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import Productodesc from "./pages/productodesc";
import Cart from "./pages/cart";
import Register from "./pages/register";
import Login from "./pages/login";
import Orders from "./pages/orders";
import Admin from "./pages/admin";
import Profile from "./pages/profile";

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
              <Route exact path="/orders" component={Orders} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/admin" component={Admin}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}