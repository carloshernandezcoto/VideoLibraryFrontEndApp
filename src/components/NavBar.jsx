import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ user }) {
  return (
    <nav className="navbar navbar-expand-sm bg-light mb-3">
      <div className="container-fluid">
        <ul className="navbar-nav">
          <li className="me-5">
            <span className="navbar-item h3">Vidly</span>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/customers">
              Customers
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </li>
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>

    // <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
    //   <div className="container-md ">
    //     <span class="navbar-brand mb-0 h1">Vidly</span>

    //     <a className="nav-item nav-link active" aria-current="page" href="#">
    //       Home
    //     </a>
    //     <a className="nav-item nav-link" href="#">
    //       Features
    //     </a>
    //     <a className="nav-item nav-link" href="#">
    //       Pricing
    //     </a>
    //     <a
    //       className="nav-item nav-link disabled"
    //       href="#"
    //       tabindex="-1"
    //       aria-disabled="true"
    //     >
    //       Disabled
    //     </a>
    //   </div>
    // </nav>
  );
}

export default NavBar;
