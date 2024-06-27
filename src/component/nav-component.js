import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

const NavComponent = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    AuthService.logout();
    window.alert("Log Out Success");
    setCurrentUser("");
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-end me-5">
          <Link
            className="navbar-brand ms-3"
            style={{ fontWeight: "bold" }}
            to="/"
          >
            Learning System
          </Link>
          <button
            className="navbar-toggler  "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end me-5"
            id="navbarNav"
          >
            <ul className="navbar-nav ">
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              )}
              {!currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link className="nav-link" to="/course">
                    Courses
                  </Link>
                </li>
              )}
              {currentUser && currentUser.found_User.role === "Instructor" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/postCourse">
                    New Course
                  </Link>
                </li>
              )}
              {currentUser && currentUser.found_User.role === "Student" && (
                <li className="nav-item">
                  <Link className="nav-link" to="/enroll">
                    Register Course
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link onClick={handleLogout} className="nav-link" to="/">
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavComponent;
