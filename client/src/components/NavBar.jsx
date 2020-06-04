import React, { useState } from "react";
import { withRouter, NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";

import { getSearchBlogs } from "../actions/BlogAction";
import { logOut } from "../actions/AuthAction";

import { toast } from "react-toastify";

const NavBar = (props) => {
  const [state, setState] = useState({
    searchBy: "",
    searchValue: "",
  });
  const { searchBy, searchValue } = state;
  const handleSearchChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const handleSearchingBy = (e) => {
    setState({ ...state, searchBy: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    props.getSearchBlogs(searchBy, searchValue);
    props.history.push("/searchblogs");
  };

  const handleShowingSearchToast = () => {
    if (searchBy === "") {
      toast("Please define the field you want to searchby!", {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  const handleLoggingOut = () => {
    props.logOut();
    localStorage.clear();
    window.location.replace("/explore");
  };

  return (
    <React.Fragment>
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top"
        style={{ backgroundColor: "#252525" }}
      >
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/explore">
                <i className="fab fa-slack-hash"></i>&nbsp;
                Explore&nbsp;&nbsp;&nbsp;
              </NavLink>
            </li>
            {props.auth.isAuthenticated && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/home">
                  <i className="fas fa-house-damage"></i>&nbsp;
                  Home&nbsp;&nbsp;&nbsp;
                </NavLink>
              </li>
            )}
            {props.auth.isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profile/${props.auth.item._id}`}
                >
                  <i className="fas fa-id-card"></i>&nbsp; Profile
                </NavLink>
              </li>
            )}
          </ul>
          {props.auth.isAuthenticated && (
            <form className="form-inline my-2 my-lg-0" onSubmit={handleSearch}>
              <select
                className="custom-select text-light"
                style={{ backgroundColor: "#000025", cursor: "pointer" }}
                required
                onClick={handleSearchingBy}
              >
                <option value>Search by</option>
                <option value="blog" className="text-muted">
                  Blog title
                </option>
                <option value="user" className="text-muted">
                  Blog author
                </option>
                <option value="tag" className="text-muted">
                  Blog tag
                </option>
              </select>
              <input
                style={{ maxWidth: 100 }}
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                name="searchValue"
                value={searchValue}
                onChange={handleSearchChange}
                onClick={handleShowingSearchToast}
              />
            </form>
          )}
          {!props.auth.isAuthenticated && (
            <Link
              to="/signup"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Sign up
            </Link>
          )}
          {!props.auth.isAuthenticated && (
            <Link
              to="/signin"
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Sign in
            </Link>
          )}
          {props.auth.isAuthenticated && (
            <button
              onClick={handleLoggingOut}
              className="btn btn-outline-danger text-danger my-2 my-sm-0"
              type="submit"
            >
              Log out
            </button>
          )}
        </div>
      </nav>
    </React.Fragment>
  );
};

function mapStateToProps(state) {
  return {
    auth: state.auth,
    searchBlogs: state.blogs.items,
  };
}
export default withRouter(
  connect(mapStateToProps, { getSearchBlogs, logOut })(NavBar)
);
