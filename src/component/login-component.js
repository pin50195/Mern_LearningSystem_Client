import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const LoginComponent = ({
  currentUser,
  setCurrentUser,
  loadingPopUp,
  setLoadingPopUp,
}) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

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

  const loginSubmit = async () => {
    setLoadingPopUp(true);
    if (
      !(email === "") &&
      !(password === "") &&
      emailErrorMessage.length + passwordErrorMessage.length === 0
    ) {
      try {
        let response = await AuthService.login(email, password);
        localStorage.setItem("user", JSON.stringify(response.data));
        window.alert("Log in Success (登入成功)");
        setCurrentUser(AuthService.getCurrentUser());
        setLoadingPopUp(false);
        navigate("/profile");
      } catch (e) {
        setLoadingPopUp(false);
        if (e.response.data.includes('"email"')) {
          setMessage([
            e.response.data,
            e.response.data.includes("is not allowed to be empty")
              ? '"email"為必填'
              : '"email"須為有效email',
          ]);
        } else if (e.response.data === "E-mail hasn't been registered yet.") {
          setMessage([e.response.data, "E-mail 尚未註冊"]);
        } else if (e.response.data.includes('"password"')) {
          setMessage([
            e.response.data,
            e.response.data.includes("is not allowed to be empty")
              ? '"password"為必填'
              : '"password"至少8個英文或數字',
          ]);
        } else if (e.response.data === "Password Error") {
          setMessage([e.response.data, "密碼錯誤"]);
        } else {
          setMessage([e.response.data]);
        }
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
        <div className="form-floating mb-3  form-group">
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
        <div className="d-block text-center form-group">
          <button onClick={loginSubmit} className="btn btn-secondary ">
            <span>Log in</span>
          </button>
        </div>
      </div>
    </main>
  );
};

export default LoginComponent;
