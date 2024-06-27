import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import { Buffer } from "buffer";

const EnrollComponent = ({ currentUser, setCurrentUser }) => {
  let [searchInput, setSearchInput] = useState("");
  let [searchResult, setSearchResult] = useState(null);

  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const changeInput = (e) => {
    setSearchInput(e.target.value);
  };
  const searchCourse = () => {
    CourseService.getCourseByName(searchInput)
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const enrollCourse = (e) => {
    CourseService.enroll(e.target.id)
      .then((data) => {
        if (data.data.msg !== "") {
          window.alert(data.data.msg);
        } else {
          window.alert("Register Success (註冊成功)");
          navigate("/course");
        }
      })
      .catch((err) => {
        window.alert(err);
      });
  };
  useEffect(() => {
    CourseService.getAllCourses()
      .then((data) => {
        setSearchResult(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <main style={{ padding: "3rem" }}>
      {!currentUser && (
        <div
          style={{ padding: "3rem" }}
          className=" d-flex flex-column align-items-center justify-content-center  mt-5"
        >
          <p className="fs-2 fw-bold text-secondary">Please log in.</p>
          <button className="btn btn-outline-secondary" onClick={redirectLogin}>
            Log in
          </button>
        </div>
      )}
      {currentUser && currentUser.found_User.role === "Instructor" && (
        <div className=" d-flex flex-column align-items-center justify-content-center  mt-5">
          <p className="fs-2 fw-bold text-secondary">
            Only students can register courses.
          </p>
        </div>
      )}
      {currentUser && currentUser.found_User.role === "Student" && (
        <div className="search">
          <input
            className="input"
            type="text"
            placeholder="Search"
            onChange={changeInput}
          />
          <button onClick={searchCourse} className="search-button">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      )}

      {currentUser &&
        currentUser.found_User.role === "Student" &&
        searchResult &&
        searchResult.length !== 0 && (
          <div className="card-container">
            {searchResult.map((course) => (
              <div key={course._id} className="card">
                <div className="card-body ">
                  {course.picture && (
                    <div>
                      <img
                        src={`data:${
                          course.picture.data.contentType
                        };base64,${Buffer.from(
                          course.picture.data.data
                        ).toString("base64")}`}
                        alt={course.title}
                        className="card-img-top mb-2"
                      />
                    </div>
                  )}
                  <h5 className="card-title fw-bold fs-4">{course.title}</h5>
                  <p className="card-text  text-body-tertiary">
                    by {course.instructor.userName}
                  </p>
                  <p className="card-text fs-4 fw-medium mb-2">
                    NT$
                    {course.price.toLocaleString("zh-TW", {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <div className="course-content-group">
                    <div className="course-hours course-content ">
                      <i className="fa-regular fa-clock"></i>
                      <p className="card-text">
                        {new Intl.NumberFormat().format(course.hour)}hrs
                      </p>
                    </div>
                    <div className="course-students course-content">
                      <i className="fa-regular fa-user"></i>
                      <p className="card-text">
                        {new Intl.NumberFormat().format(course.students.length)}
                      </p>
                    </div>
                    <button
                      type="button"
                      id={course._id}
                      className="card-text btn btn-outline-secondary"
                      onClick={enrollCourse}
                    >
                      Register
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      <footer className=" text-muted text-center">
        <hr />
        <p>&copy; 2024 Pin Chen</p>
      </footer>
    </main>
  );
};

export default EnrollComponent;
