import React, { useState } from "react"; 
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../static/assets/logo.png";
import '../../style/navbar.scss';
import { useSelector, useDispatch } from "react-redux";
import 'bootstrap';
import { logoutUsuario } from "../../actions/usuarioActions";

const NavigationComponent = () => {
  const getCarrito = useSelector((state) => state.getcarritoReducer);
  const { articles } = getCarrito;
  const getCurrentuser = useSelector((state) => state.loginReducer);
  const { currentUser } = getCurrentuser;
  const dispatch = useDispatch();
  
  return (
    <div className="nav-container" id="test">
      <div className="nav-bar">
        <NavLink exact to="/" activeClassName="nav-link-active">
          <img className="navbar-logo" src={logo} alt="Logo" />
        </NavLink>
  
        <div className="menu-bar">
          <NavLink to="/" className="navbar-link" activeClassName="nav-link-active">
            Home
          </NavLink>
          {!currentUser ? (<NavLink exact to="/ordenadores" className="navbar-link mobile-home" activeClassName="nav-link-active">
            Ordenadores
          </NavLink>) : ""}
  
          {!currentUser ?(<NavLink to="/smartphones" className="navbar-link" activeClassName="nav-link-active">
            Smartphones
          </NavLink>) : ""}
  
          {!currentUser ?(<NavLink to="/perifericos" className="navbar-link" activeClassName="nav-link-active">
            Periféricos
          </NavLink>) : ""}
  
          {currentUser ? (
              <div className="dropdown"  style={{ border: 'none', background: 'none' }}>
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {currentUser.nombre}
                </button>
                <ul className="dropdown-menu">
                  {currentUser.isAdmin ? (<li><a className="dropdown-item" href="/admin">Panel Admin</a></li>):""}
                  <li><a className="dropdown-item" href="/profile">Profile</a></li>
                  <li><a className="dropdown-item" href="/orders">Orders</a></li>
                  <li><a className="dropdown-item" onClick={() => dispatch(logoutUsuario())}>Logout</a></li>
                </ul>
              </div>
          ) : (
            <NavLink to="/login" className="navbar-link" activeClassName="nav-link-active">
              <FontAwesomeIcon icon={faUser} style={{ "fontSize": "1.5em" }} />
            </NavLink>
          )}
  
          <NavLink to="/cart" className="navbar-link" activeClassName="nav-link-active">
            <FontAwesomeIcon icon={faShoppingCart} style={{ "fontSize": "1.5em" }} />{(articles ? articles.length : 0)}
          </NavLink>
        </div>
      </div>
    </div>
  );
  
};

export default NavigationComponent;
