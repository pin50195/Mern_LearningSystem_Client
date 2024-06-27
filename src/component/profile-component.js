import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const ProfileComponent = ({ currentUser, setCurrentUser }) => {
  let [studentRegisterCourses, setStudentRegisterCourses] = useState("");
  let [coursesNumber, setCoursesNumber] = useState("");
  let [studentsNumber, setStudentsNumber] = useState("");

  // 頁面載入前緩衝
  let [loading, setLoading] = useState(true);

  //記錄錯誤訊息
  let [error, setError] = useState(null);

  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [enrolledData, coursesData] = await Promise.all([
          CourseService.getEnrolled(currentUser.found_User._id),
          CourseService.get(currentUser.found_User._id),
        ]);

        setStudentRegisterCourses(enrolledData.data.length);
        setCoursesNumber(coursesData.data.length);
        setStudentsNumber(
          coursesData.data.reduce(
            (sum, course) => sum + course.students.length,
            0
          )
        );
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return;
  }
  if (error) {
    return (
      <div
        style={{ padding: "6rem" }}
        className="d-flex flex-column justify-content-center align-items-center mt-5"
      >
        <p className="fs-2 fw-bold text-secondary">Please log in. </p>
        <button className="btn btn-outline-secondary" onClick={redirectLogin}>
          Log in
        </button>
      </div>
    );
  }

  return (
    <main>
      <div style={{ padding: "2rem 2rem 6rem 2rem" }}>
        {currentUser && (
          <div className="profile">
            <h2>Hi, {currentUser.found_User.userName}</h2>
            <div className="profile-container">
              <div className="profile-image">
                <div className="image-container">
                  <i className="fa-solid fa-circle-user"></i>
                </div>
                <p> {currentUser.found_User.email}</p>
              </div>
              <div className="profile-information">
                <div className="profile-item">
                  <p className="profile-title">Role</p>
                  <p className="profile-content">
                    {currentUser.found_User.role}
                  </p>
                </div>
                {currentUser.found_User.role === "Student" && (
                  <>
                    <div className="divBorder"></div>
                    <div className="profile-item">
                      <p className="profile-title">Courses</p>
                      <p className="profile-content">
                        {studentRegisterCourses}
                      </p>
                    </div>
                  </>
                )}
                {currentUser.found_User.role === "Instructor" && (
                  <>
                    <div className="divBorder"></div>
                    <div className="profile-item">
                      <p className="profile-title">Courses</p>
                      <p className="profile-content">{coursesNumber}</p>
                    </div>
                    <div className="divBorder"></div>
                    <div className="profile-item">
                      <p className="profile-title">Students</p>
                      <p className="profile-content">{studentsNumber}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
export default ProfileComponent;
