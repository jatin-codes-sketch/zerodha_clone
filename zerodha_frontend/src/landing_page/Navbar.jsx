import React from "react";
import { Link } from "react-router-dom";
import "./style/navbar.css"

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom fixed-top bg-white py-3">
      <div className="container">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/media/logo.svg"
            alt="Zerodha Logo"
            style={{ height: "20px" }}
          />
        </Link>

        <button
          className="navbar-toggler border-0 shadow-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse"
          id="navbarContent"
        >
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-4 mt-4 mt-lg-0">
            <li className="nav-item mb-2 mb-lg-0">
              <button
                className="btn btn-link nav-link d-flex align-items-center gap-2 p-0"
                style={{
                  color: "#387ed1",
                  fontWeight: "500",
                  textDecoration: "none",
                }}
                onClick={() => {
                  window.location.href = "https://main.d1jo1vg9zdi7iy.amplifyapp.com/signup";
                }}
              >
                <img
                  src="/media/kite-logo.svg"
                  alt="Kite"
                  style={{ width: "16px", height: "16px" }}
                />
                <span className="d-lg-none d-xl-inline">Go with Kite</span>
                <span className="d-none d-lg-inline d-xl-none">Kite</span>
              </button>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-muted py-2 py-lg-0" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-muted py-2 py-lg-0" to="/product">
                Product
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-muted py-2 py-lg-0" to="/pricing">
                Pricing
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link text-muted py-2 py-lg-0" to="/support">
                Support
              </Link>
            </li>
            
            <li className="nav-item ms-lg-2">
               <button className="btn border-0 p-0">
                  <i className="fa fa-bars text-muted" aria-hidden="true"></i>
               </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;