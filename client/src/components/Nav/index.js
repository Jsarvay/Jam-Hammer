import React from "react";
import { MenuItems } from "./MenuItems";
import "./style.css";

class Navbar extends React.Component {
  render() {
    return (
      <nav className="NavbarItems">
        <h1 className="navbar-logo">JamHammer</h1>
        <div className="menu-icon"></div>
        <ul>
          {MenuItems.map((item, index) => {
            return (
              <li key={index}>
                <a className={item.Cname} href={item.url}>
                  {item.title}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Navbar;
