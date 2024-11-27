import React from "react";
import "./Navbar.css";
import { IoPerson } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import Button from "../Button/Button";
import "../../App.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">🌙 </span>
        <span className="logo-text">
          Event<span className="highligt">Hub</span>
        </span>
      </div>
      <ul className="navbar-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/events">Events</Link>
        </li>
        <li>
          <Link to="/review">Review</Link>
        </li>
      </ul>
      <div className="navbar-login">
        {/* Sign In Butonu */}
        <Link to="/signin">
          <Button text="Sign In" variant="secondary" />
        </Link>
        {/* Sign Up Butonu */}
        <Link to="/signup">
          <Button text="Sign Up" variant="primary" icon={<IoPerson />} />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
