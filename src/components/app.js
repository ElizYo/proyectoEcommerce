import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import Productodesc from "./pages/productodesc";
import Cart from "./pages/cart";
import Register from "./pages/register";
import Login from "./pages/login";
import Orders from "./pages/orders";
import Profile from "./pages/profile";
import Ordenadores from "./pages/ordenadores";
import Smartphones from "./pages/smartphones";
import Perifericos from "./pages/perifericos";
import Admin from "./pages/admin";
import EditProduct from "./pages/editproduct";

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
              <Route exact path="/ordenadores" component={Ordenadores} />
              <Route exact path="/smartphones" component={Smartphones} />
              <Route exact path="/perifericos" component={Perifericos} />
              <Route exact path="/admin" component={Admin} />
              <Route exact path="/admin/editproduct/:productid" component={EditProduct} />

            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}