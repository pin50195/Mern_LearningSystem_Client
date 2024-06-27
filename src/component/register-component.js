import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = ({
  currentUser,
  setCurrentUser,
  loadingPopUp,
  setLoadingPopUp,
}) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [nameErrorMessage, setNameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [roleErrorMessage, setRoleErrorMessage] = useState("");

  const nameChange = (e) => {
    const newValue = e.target.value;
    setUserName(newValue);
    if (newValue.length === 0) {
      setNameErrorMessage([
        '"userName" is not allowed to be empty',
        '"userName"為必填',
      ]);
    } else if (newValue.length < 3) {
      setNameErrorMessage([
        '"userName" length must be at least 3 characters long',
        '"userName"至少3個字元',
      ]);
    } else {
      setNameErrorMessage("");
    }
  };

  const emailChange = (e) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newValue = e.target.value;
    setEmail(newValue);

    if (newValue.length === 0) {
      setEmailErrorMessage([
        '"email" is not allowed to be empty',
        '"email"為必填',
      ]);
    } else if (!emailRegex.test(newValue)) {
      setEmailErrorMessage([
        '"email" must be a valid email',
        '"email"須為有效email',
      ]);
    } else {
      setEmailErrorMessage("");
    }
  };

  const passwordChange = (e) => {
    const newValue = e.target.value;
    setPassword(newValue);
    if (newValue.length === 0) {
      setPasswordErrorMessage([
        '"password" is not allowed to be empty',
        '"password"為必填',
      ]);
    } else if (newValue.length < 8) {
      setPasswordErrorMessage([
        '"password" length must be at least 8 characters long',
        '"password"至少8個英文或數字',
      ]);
    } else {
      setPasswordErrorMessage("");
    }
  };
  const roleChange = (e) => {
    const newValue = e.target.value;
    setRole(newValue);
    if (newValue === "Role") {
      setRoleErrorMessage([
        '"role" must be one of [Instructor, Student]',
        '"role"為必填，請選擇Instructor或Student',
      ]);
    } else {
      setRoleErrorMessage("");
    }
  };

  const registerSubmit = () => {
    if (
      !(userName === "") &&
      !(email === "") &&
      !(password === "") &&
      !(role === "") &&
      nameErrorMessage.length +
        emailErrorMessage.length +
        passwordErrorMessage.length +
        roleErrorMessage.length ===
        0
    ) {
      let confirmRegister = window.confirm(
        "Register account? (確定註冊會員?) "
      );
      if (confirmRegister) {
        setLoadingPopUp(true);
        AuthService.register(userName, email, password, role)
          .then(() => {
            setLoadingPopUp(false);
            window.alert("Register Success (註冊成功)");
            navigate("/login");
          })
          .catch((e) => {
            setLoadingPopUp(false);
            if (e.response.data.includes('"userName"')) {
              setMessage([
                e.response.data,
                e.response.data.includes("is not allowed to be empty")
                  ? '"userName"為必填'
                  : '"userName"至少3個字元',
              ]);
            } else if (e.response.data.includes('"email"')) {
              setMessage([
                e.response.data,
                e.response.data.includes("is not allowed to be empty")
                  ? '"email"為必填'
                  : '"email"須為有效email',
              ]);
            } else if (e.response.data.includes('"password"')) {
              setMessage([
                e.response.data,
                e.response.data.includes("is not allowed to be empty")
                  ? '"password"為必填'
                  : '"password"至少8個英文或數字',
              ]);
            } else if (e.response.data.includes('"role"')) {
              setMessage([
                e.response.data,
                '"role"為必填，請選擇Instructor或Student',
              ]);
            } else {
              setMessage([e.response.data]);
            }
          });
      }
    } else {
      alert("Please check the form.(請確認表單已填寫正確)");
    }
  };

  if (currentUser) {
    navigate("/");
  }

  return (
    <main
      style={{ padding: "3rem 3rem 6rem 3rem " }}
      className="col-md-12 d-flex flex-column align-items-center justify-content-center"
    >
      {message && (
        <div
          style={{ width: "100%" }}
          className="alert alert-danger text-center  mb-4"
        >
          {message.length >= 2 ? (
            message.map((msg, index) => (
              <p key={index} style={{ marginTop: "1rem" }}>
                {msg}
              </p>
            ))
          ) : (
            <p style={{ marginTop: "1rem" }}>{message}</p>
          )}
        </div>
      )}
      <div className="form-group">
        <div className="form-floating mb-3 form-group">
          <input
            onChange={nameChange}
            type="text"
            className="form-control"
            name="username"
          />
          <label htmlFor=" username">Name</label>
          {nameErrorMessage && (
            <div>
              {nameErrorMessage.length >= 2 ? (
                nameErrorMessage.map((msg, index) => (
                  <p
                    key={index}
                    style={{ fontSize: "11px" }}
                    className="mb-0 mt-1 text-danger fw-semibold"
                  >
                    * {msg}
                  </p>
                ))
              ) : (
                <p
                  style={{ fontSize: "11px" }}
                  className="mb-0 mt-1 text-danger fw-semibold"
                >
                  {nameErrorMessage}
                </p>
              )}
            </div>
          )}
        </div>
        <br />
        <div className="form-floating mb-3 form-group">
          <input
            onChange={emailChange}
            type="text"
            className="form-control"
            name="email"
          />
          <label htmlFor="email">E-mail</label>
          {emailErrorMessage && (
            <div>
              {emailErrorMessage.length >= 2 ? (
                emailErrorMessage.map((msg, index) => (
                  <p
                    key={index}
                    style={{ fontSize: "11px" }}
                    className="mb-0 mt-1 text-danger fw-semibold"
                  >
                    * {msg}
                  </p>
                ))
              ) : (
                <p
                  style={{ fontSize: "11px" }}
                  className="mb-0 mt-1 text-danger fw-semibold"
                >
                  {emailErrorMessage}
                </p>
              )}
            </div>
          )}
        </div>
        <br />
        <div className="form-floating mb-3 form-group">
          <input
            onChange={passwordChange}
            type="password"
            className="form-control"
            name="password"
          />
          <label htmlFor="password">Password</label>

          {passwordErrorMessage && (
            <div>
              {passwordErrorMessage.length >= 2 ? (
                passwordErrorMessage.map((msg, index) => (
                  <p
                    key={index}
                    style={{ fontSize: "11px" }}
                    className="mb-0 mt-1 text-danger fw-semibold"
                  >
                    * {msg}
                  </p>
                ))
              ) : (
                <p
                  style={{ fontSize: "11px" }}
                  className="mb-0 mt-1 text-danger fw-semibold"
                >
                  {passwordErrorMessage}
                </p>
              )}
            </div>
          )}
        </div>
        <br />
        <select
          onChange={roleChange}
          style={{ height: "55px" }}
          className="form-select text-secondary form-group"
          aria-label="Default select example"
          name="role"
        >
          <option defaultValue>Role</option>
          <option htmlFor="role">Student</option>
          <option htmlFor="role">Instructor</option>
        </select>
        {roleErrorMessage && (
          <div>
            {roleErrorMessage.length >= 2 ? (
              roleErrorMessage.map((msg, index) => (
                <p
                  key={index}
                  style={{ fontSize: "11px" }}
                  className="mb-0 mt-1 text-danger fw-semibold"
                >
                  * {msg}
                </p>
              ))
            ) : (
              <p
                style={{ fontSize: "11px" }}
                className="mb-0 mt-1 text-danger fw-semibold"
              >
                {roleErrorMessage}
              </p>
            )}
          </div>
        )}
        <br />
        <div className="d-block text-center">
          <button onClick={registerSubmit} className="btn  btn-secondary ">
            <span>Register</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default RegisterComponent;
