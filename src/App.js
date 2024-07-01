import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import AuthService from "./services/auth.service";
import Layout from "./component/Layout";
import HomeComponent from "./component/home-component";
import RegisterComponent from "./component/register-component";
import LoginComponent from "./component/login-component";
import ProfileComponent from "./component/profile-component";
import CourseComponent from "./component/course-component";
import PostCourseComponent from "./component/postCourse-component";
import EnrollComponent from "./component/enroll-component";
import EditCourseComponent from "./component/editCourse-component";
import "./styles/style.css";

function App() {
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  let [currentCourse, setCurrentCourse] = useState("");
  let [loadingPopUp, setLoadingPopUp] = useState(false);

  return (
    <div className="App">
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
              />
            }
          >
            <Route index element={<HomeComponent />}></Route>
            <Route
              path="register"
              element={
                <RegisterComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  loadingPopUp={loadingPopUp}
                  setLoadingPopUp={setLoadingPopUp}
                />
              }
            ></Route>
            <Route
              path="login"
              element={
                <LoginComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  loadingPopUp={loadingPopUp}
                  setLoadingPopUp={setLoadingPopUp}
                />
              }
            ></Route>
            <Route
              path="profile"
              element={
                <ProfileComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  loadingPopUp={loadingPopUp}
                  setLoadingPopUp={setLoadingPopUp}
                />
              }
            ></Route>
            <Route
              path="course"
              element={
                <CourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                  loadingPopUp={loadingPopUp}
                  setLoadingPopUp={setLoadingPopUp}
                />
              }
            ></Route>
            <Route
              path="postCourse"
              element={
                <PostCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            ></Route>
            <Route
              path="enroll"
              element={
                <EnrollComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  loadingPopUp={loadingPopUp}
                  setLoadingPopUp={setLoadingPopUp}
                />
              }
            ></Route>
            <Route
              path="edit"
              element={
                <EditCourseComponent
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                  currentCourse={currentCourse}
                  setCurrentCourse={setCurrentCourse}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
