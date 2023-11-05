import React from "react";
import '../../style/footer.scss';
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { logoutUsuario } from "../../actions/usuarioActions";

const Footer = () => {
  const getCurrentuser = useSelector((state) => state.loginReducer);
  const { currentUser } = getCurrentuser;
  const dispatch = useDispatch();

  return (
    <div className="footer-container">
      <div className="footer-content">
        <div className="footer-logo-icons-container">
          <div className="footer-logo-descripcion-container">
            <div className="footer-logo-descripcion-content">
              <img className="navbar-logo" src="assets/images/logo.png" alt="Logo" />
              <span>Av. de la Innovación, 15, 48902 País Vasco</span>
              <span>954 46 00 00</span>
              <span>¡Contacta con nostros!</span>
            </div>
          </div>
          <div className="footer-icons">
            <div className="navlinks-container">
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
            </div>
            <div className="icons-container">
              <i className="bi bi-facebook"></i>
              <i className="bi bi-twitter"></i>
              <i className="bi bi-instagram"></i>
              <i className="bi bi-youtube"></i>
            </div>
          </div>
        </div>

        <div className="copyright">
        <span><i className="bi bi-c-square"></i> Desarrollado por Yohana</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
