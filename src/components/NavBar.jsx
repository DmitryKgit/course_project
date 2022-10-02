import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <ul className="nav">
      <li className="nav-item">
        <Link to="/" className="nav-link active" aria-current="page" href="#">
          Main Page
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/login" className="nav-link" href="#">
          Login
        </Link>
      </li>
      <li className="nav-item">
        <Link to="/users" className="nav-link" href="#">
          Users
        </Link>
      </li>
    </ul>

    // <ul>
    //   <li>
    //     <Link to="/">Main Page</Link>
    //   </li>
    //   <li>
    //     <Link to="/login">Login</Link>
    //   </li>
    //   <li>
    //     <Link to="/users">Users</Link>
    //   </li>
    // </ul>
  );
};

export default NavBar;
