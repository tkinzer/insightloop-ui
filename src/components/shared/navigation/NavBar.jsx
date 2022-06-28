import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="w-full flex flex-row">
      <a className="navbar-brand" href="/">
        Insight Loop
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        toggle
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/journal">
              Journal
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/insights">
              Insights
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
