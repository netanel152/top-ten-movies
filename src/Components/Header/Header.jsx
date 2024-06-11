import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <div className="header">
      <div className="options">
        <Link className="option" to="/">
          Home
        </Link>
      </div>
    </div>
  );
};

export default Header;
