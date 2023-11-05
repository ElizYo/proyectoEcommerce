import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import logo from "../../../static/assets/images/logo.png";
import "../../style/navbar.scss";
import { useSelector, useDispatch } from "react-redux";
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
        <NavLink to={currentUser && currentUser.isAdmin ? "/admin" : "/"} activeClassName="nav-link-active">
          <img className="navbar-logo" src={logo} alt="Logo" />
        </NavLink>

        <div className="menu-bar">
          <NavLink exact to={currentUser && currentUser.isAdmin ? "/admin" : "/"} className="navbar-link" activeClassName="nav-link-active">
            Home
          </NavLink>


          {!currentUser || (currentUser && !currentUser.isAdmin) ? (
            <NavLink exact to="/ordenadores" className="navbar-link mobile-home" activeClassName="nav-link-active">
              Ordenadores
            </NavLink>
          ) : (
            ""
          )}

          {!currentUser || (currentUser && !currentUser.isAdmin) ? (
            <NavLink to="/smartphones" className="navbar-link" activeClassName="nav-link-active">
              Smartphones
            </NavLink>
          ) : (
            ""
          )}

          {!currentUser || (currentUser && !currentUser.isAdmin) ? (
            <NavLink to="/perifericos" className="navbar-link" activeClassName="nav-link-active">
              Periféricos
            </NavLink>
          ) : (
            ""
          )}

          {currentUser ? (
            <div className="dropdown" style={{ border: "none", background: "none" }}>
              <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {currentUser.nombre}
              </button>
              <ul className="dropdown-menu">
                <li>
                  <NavLink to="/profile" className="dropdown-item" activeClassName="nav-link-active">
                    Profile
                  </NavLink>
                </li>
                {!currentUser.isAdmin ? (
                  <li>
                    <NavLink to="/orders" className="dropdown-item" activeClassName="nav-link-active">
                      Orders
                    </NavLink>
                  </li>
                ) : (
                  ""
                )}
                <li>
                  <a className="dropdown-item" onClick={() => dispatch(logoutUsuario())}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <NavLink to="/login" className="navbar-link" activeClassName="nav-link-active">
              <FontAwesomeIcon icon={faUser} style={{ fontSize: "1.5em" }} />
            </NavLink>
          )}

          <NavLink to="/cart" className="navbar-link" activeClassName="nav-link-active">
            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: "1.5em" }} />{(articles ? articles.length : 0)}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavigationComponent;
