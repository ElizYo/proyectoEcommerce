import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../static/assets/logo.png"
import '../../style/navbar.scss';


export default class NavigationComponent extends Component {
  constructor() {
    super();
  }

  render() {
    return (
        <div className="nav-container">
        <div className="nav-bar">
          <NavLink exact to="/" activeClassName="nav-link-active">
            <img className="navbar-logo" src={logo} alt="Logo" />
          </NavLink>

          <div className="menu-bar">
            <NavLink to="/" className="navbar-link" activeClassName="nav-link-active">
              Home
            </NavLink>
            <NavLink exact to="/ordenadores" className="navbar-link mobile-home" activeClassName="nav-link-active">
              Ordenadores
            </NavLink>
            <NavLink to="/smartphones" className="navbar-link" activeClassName="nav-link-active">
              Smartphones
            </NavLink>
            <NavLink to="/perifericos" className="navbar-link" activeClassName="nav-link-active">
              Periféricos
            </NavLink>
            <NavLink to="/login" className="navbar-link" activeClassName="nav-link-active">
                <FontAwesomeIcon icon={faUser} style={{ "fontSize": "1.5em" }} />
            </NavLink>
            <NavLink to="/cart" className="navbar-link" activeClassName="nav-link-active">
                <FontAwesomeIcon icon={faShoppingCart} style={{ "fontSize": "1.5em" }} />
            </NavLink>
          </div>
        </div>
      </div>
    );
  }
}
