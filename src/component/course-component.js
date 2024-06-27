import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";
import { Buffer } from "buffer";

const CourseComponent = ({
  currentUser,
  setCurrentUser,
  currentCourse,
  setCurrentCourse,
}) => {
  let [courses, setCourses] = useState(null);
  let [message, setMessage] = useState("");

  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    let _id;
    if (currentUser) {
      _id = currentUser.found_User._id;
      if (currentUser.found_User.role === "Instructor") {
        CourseService.get(_id)
          .then((data) => {
            setCourses(data.data);
          })
          .catch((e) => {
            setMessage(e);
          });
      } else if (currentUser.found_User.role === "Student") {
        CourseService.getEnrolled(_id)
          .then((data) => {
            setCourses(data.data);
          })
          .catch((e) => {
            setMessage(e);
          });
      }
    }
  }, []);

  const editCourse = (e) => {
    CourseService.getCourseByID(e.target.id).then((data) => {
      setCurrentCourse(data);
      navigate("/edit");
    });
  };

  const deleteCourse = (e) => {
    let confirmDelete = window.confirm("Delete course? (確定刪除課程?) ");
    if (confirmDelete)
      CourseService.delete(e.target.id)
        .then(() => {
          setCourses(courses.filter((course) => course._id !== e.target.id));
        })
        .catch((e) => {
          setMessage(e);
        });
  };

  return (
    <main>
      {!currentUser && (
        <div
          style={{ padding: "6rem" }}
          className=" d-flex flex-column align-items-center justify-content-center  mt-5"
        >
          <p className="fs-2 fw-bold text-secondary">Please log in.</p>
          <button className="btn btn-outline-secondary" onClick={redirectLogin}>
            Log in
          </button>
        </div>
      )}
      {message && (
        <div
          style={{ padding: "6rem" }}
          className=" d-flex flex-column align-items-center justify-content-center  mt-5"
        >
          {message}
        </div>
      )}
      {currentUser && (
        <div style={{ padding: "3rem 3rem 0 3rem" }}>
          <p className="fs-2 fw-bold text-secondary">
            The courses you currently have
          </p>
        </div>
      )}
      {currentUser && courses && courses.length !== 0 && (
        <div className="card-container ">
          {courses.map((course, index) => {
            return (
              <div className="card mb-3" key={index}>
                <div className="card-body d-flex flex-column ">
                  {currentUser.found_User.role === "Instructor" &&
                    currentUser.found_User._id === course.instructor._id && (
                      <div className="course-page-button align-self-end">
                        <button
                          type="button"
                          className="edit-button"
                          aria-label="edit"
                        >
                          <i
                            className="fa-solid fa-pen-to-square"
                            id={course._id}
                            onClick={editCourse}
                          ></i>
                        </button>
                        <button
                          type="button"
                          className="trash-button"
                          aria-label="delete"
                        >
                          <i
                            className="fa-solid fa-trash"
                            id={course._id}
                            onClick={deleteCourse}
                          ></i>
                        </button>
                      </div>
                    )}
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};

export default CourseComponent;
