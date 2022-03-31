import React from "react";
import { Link } from "react-router-dom";

const Navbar = (): JSX.Element => {
  return (
    <nav className="navbar">
      <div id="navbar_logo">
        <h1>
          <Link to={"/"}>SP</Link>
        </h1>
      </div>
      <div id="navbar_menus">
        <ul>
          <li>
            <Link to={"/itemlist"}>Item List</Link>
          </li>
          <li>
            <Link to={"/storage"}>Storage</Link>
          </li>
          <li>
            <Link to={"/invoice"}>Invoice</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
