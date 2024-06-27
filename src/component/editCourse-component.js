import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const EditCourseComponent = ({
  currentUser,
  setCurrentUser,
  currentCourse,
  setCurrentCourse,
}) => {
  let [title, setTitle] = useState(["", ""]);
  let [description, setDescription] = useState(["", ""]);
  let [price, setPrice] = useState([0, 0]);
  let [hour, setHour] = useState([0, 0]);
  let [picture, setPicture] = useState(null);
  let [pictureTitle, setPictureTitle] = useState("");
  let [message, setMessage] = useState("");
  let [titleErrorMessage, setTitleErrorMessage] = useState("");
  let [descriptionErrorMessage, setDescriptionErrorMessage] = useState("");
  let [hourErrorMessage, setHourErrorMessage] = useState("");
  let [priceErrorMessage, setPriceErrorMessage] = useState("");
  let [pictureErrorMessage, setPictureErrorMessage] = useState("");

  const navigate = useNavigate();
  const redirectLogin = () => {
    navigate("/login");
  };
  const redirectCourses = () => {
    navigate("/course");
  };

  const changeTitle = (e) => {
    const defaultValue = e.target.defaultValue;
    const newValue = e.target.value;
    setTitle([defaultValue, newValue]);

    if (newValue.length === 0) {
      setTitleErrorMessage([
        '"title" is not allowed to be empty',
        '"title"為必填',
      ]);
    } else if (newValue.length < 5) {
      setTitleErrorMessage([
        '"title" length must be at least 5 characters long',
        '"title"介於5至50個字元之間',
      ]);
    } else if (newValue.length > 50) {
      setTitleErrorMessage([
        '"title" length must be less than or equal to 50 characters long',
        '"title"介於5至50個字元之間',
      ]);
    } else {
      setTitleErrorMessage("");
    }
  };
  const changeDesciption = (e) => {
    const defaultValue = e.target.defaultValue;
    const newValue = e.target.value;
    setDescription([defaultValue, newValue]);
    if (newValue.length === 0) {
      setDescriptionErrorMessage([
        '"description" is not allowed to be empty',
        '"description"為必填',
      ]);
    } else if (newValue.length < 5) {
      setDescriptionErrorMessage([
        '"description" length must be at least 5 characters long',
        '"description"介於5至50個字元之間',
      ]);
    } else if (newValue.length > 50) {
      setDescriptionErrorMessage([
        '"description" length must be less than or equal to 50 characters long',
        '"description"介於5至50個字元之間',
      ]);
    } else {
      setDescriptionErrorMessage("");
    }
  };
  const changeHour = (e) => {
    const defaultValue = e.target.defaultValue;
    const newValue = e.target.value;
    setHour([defaultValue, newValue]);
    if (isNaN(e.target.valueAsNumber)) {
      setHourErrorMessage([
        '"hour" must be a number',
        '"hour"為必填且須為數字',
      ]);
    } else if (newValue < 1) {
      setHourErrorMessage([
        '"hour" must be greater than or equal to 1',
        '"hour"介於1至100',
      ]);
    } else if (newValue > 100) {
      setHourErrorMessage([
        '"hour" must be less than or equal to 100',
        '"hour"介於1至100',
      ]);
    } else {
      setHourErrorMessage("");
    }
  };
  const changePrice = (e) => {
    const defaultValue = e.target.defaultValue;
    const newValue = e.target.value;
    setPrice([defaultValue, newValue]);
    if (isNaN(e.target.valueAsNumber)) {
      setPriceErrorMessage([
        '"price" must be a number',
        '"price"為必填且須為數字',
      ]);
    } else if (newValue < 10) {
      setPriceErrorMessage([
        '"price" must be greater than or equal to 10',
        '"price"介於10至20000',
      ]);
    } else if (newValue > 20000) {
      setPriceErrorMessage([
        '"price" must be less than or equal to 20000',
        '"price"介於10至20000',
      ]);
    } else {
      setPriceErrorMessage("");
    }
  };
  const uploadImage = (e) => {
    const file = e.target.files[0];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes
    if (file.size > maxSize) {
      setPicture(null);
      setPictureTitle("");
      setPictureErrorMessage([
        "File size is too large. Max limit is 2MB.",
        "圖片檔案超過2MB，請重新上傳",
      ]);
    } else {
      setPicture(file);
      setPictureTitle(file.name);
      setPictureErrorMessage("");
    }
  };

  const editCourse = () => {
    if (
      title[1] === title[0] &&
      description[1] === description[0] &&
      hour[1] === hour[0] &&
      price[1] === price[0] &&
      pictureTitle === "" &&
      picture === null
    ) {
      let notEditButSubmit = window.confirm(
        "You didn't make any modifications.Returning to the Courses page? (此次無任何修改，是否返回課程頁面?)"
      );
      if (notEditButSubmit) {
        navigate("/course");
      }
    } else {
      if (
        titleErrorMessage.length +
          descriptionErrorMessage.length +
          hourErrorMessage.length +
          priceErrorMessage.length +
          pictureErrorMessage.length ===
        0
      ) {
        let confirmEdit = window.confirm("Modify Course? (確定修改課程?) ");
        if (confirmEdit) {
          CourseService.edit(
            currentCourse.data._id,
            title[1],
            description[1],
            hour[1],
            price[1],
            pictureTitle,
            picture
          )
            .then(() => {
              window.alert("Modified Success (修改成功)");
              navigate("/course");
            })
            .catch((e) => {
              if (e.response.data.includes('"title"')) {
                setMessage([
                  e.response.data,
                  e.response.data.includes("is not allowed to be empty")
                    ? '"title"為必填'
                    : '"title"介於5至50個字元之間',
                ]);
              } else if (e.response.data.includes('"description"')) {
                setMessage([
                  e.response.data,
                  e.response.data.includes("is not allowed to be empty")
                    ? '"description"為必填'
                    : '"description"介於5至50個字元之間',
                ]);
              } else if (e.response.data.includes('"hour"')) {
                setMessage([e.response.data, '"hour"介於1至100']);
              } else if (e.response.data.includes('"price"')) {
                setMessage([e.response.data, '"price"介於10至20000']);
              } else if (e.response.data.includes('"pictureTitle"')) {
                setMessage([
                  '"picture" is not allowed to be empty',
                  "請上傳照片",
                ]);
              } else if (
                e.response.data === "File size is too large. Max limit is 2MB."
              ) {
                setMessage([e.response.data, "圖片檔案超過2MB，請重新上傳"]);
              } else {
                setMessage([e.response.data]);
              }
            });
        }
      } else {
        alert("Please check the form.(請確認表單已填寫正確)");
      }
    }
  };

  return (
    <main style={{ padding: "3rem" }}>
      {!currentUser && (
        <div
          style={{ padding: "3rem" }}
          className="d-flex flex-column justify-content-center align-items-center mt-5"
        >
          <p className="fs-2 fw-bold text-secondary">Please log in.</p>
          <button className="btn btn-outline-secondary" onClick={redirectLogin}>
            Log in
          </button>
        </div>
      )}
      {currentUser && currentUser.found_User.role !== "Instructor" && (
        <div className=" d-flex flex-column align-items-center justify-content-center  mt-5">
          <p className="fs-2 fw-bold text-secondary">
            Only instructors can modify courses.
          </p>
          <button className="btn btn-outline-secondary" onClick={redirectLogin}>
            Log in
          </button>
        </div>
      )}
      {currentUser &&
        currentUser.found_User.role === "Instructor" &&
        !currentCourse && (
          <div className=" d-flex flex-column align-items-center justify-content-center  mt-5">
            <p className="fs-2 fw-bold text-secondary">
              Please check your courses.
            </p>
            <button
              className="btn btn-outline-secondary"
              onClick={redirectCourses}
            >
              Courses
            </button>
          </div>
        )}

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
      {currentUser &&
        currentUser.found_User.role === "Instructor" &&
        currentCourse && (
          <div
            className="col-md-12 d-flex flex-column align-items-center justify-content-center"
            style={{ padding: "0 1.5rem 1.5rem 1.5rem" }}
          >
            <div className="form-floating mb-3  course-form-group">
              <input
                name="title"
                type="text"
                className="form-control"
                id="exampleforTitle"
                onChange={changeTitle}
                defaultValue={currentCourse.data.title}
              />
              <label htmlFor="exampleforTitle">Course Title</label>
              {titleErrorMessage && (
                <div>
                  {titleErrorMessage.length >= 2 ? (
                    titleErrorMessage.map((msg, index) => (
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
                      {titleErrorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="form-floating mb-3  course-form-group">
              <textarea
                className="form-control"
                id="exampleforContent"
                name="content"
                onChange={changeDesciption}
                defaultValue={currentCourse.data.description}
              />
              <label htmlFor="exampleforContent">Course Description</label>
              {descriptionErrorMessage && (
                <div>
                  {descriptionErrorMessage.length >= 2 ? (
                    descriptionErrorMessage.map((msg, index) => (
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
                      {descriptionErrorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="form-floating mb-3  course-form-group">
              <input
                name="hour"
                type="number"
                className="form-control"
                id="exampleforHour"
                onInput={changeHour}
                defaultValue={currentCourse.data.hour}
              />
              <label htmlFor="exampleforHour">Hour</label>
              {hourErrorMessage && (
                <div>
                  {hourErrorMessage.length >= 2 ? (
                    hourErrorMessage.map((msg, index) => (
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
                      {hourErrorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="form-floating mb-3  course-form-group">
              <input
                name="price"
                type="number"
                className="form-control"
                id="exampleforPrice"
                onInput={changePrice}
                defaultValue={currentCourse.data.price}
              />
              <label htmlFor="exampleforPrice">Price</label>
              {priceErrorMessage && (
                <div>
                  {priceErrorMessage.length >= 2 ? (
                    priceErrorMessage.map((msg, index) => (
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
                      {priceErrorMessage}
                    </p>
                  )}
                </div>
              )}
            </div>
            <div className="mb-3 course-form-group " style={{ height: "58px" }}>
              <input
                className="form-control text-secondary "
                type="file"
                id="formFileMultiple"
                accept=".png, .jpg, .jpeg"
                onChange={uploadImage}
              ></input>
            </div>

            {currentCourse && (
              <div className="p-1 course-form-group ">
                <p style={{ textAlign: "start" }}>
                  Current Image :&nbsp;
                  {pictureTitle
                    ? pictureTitle
                    : currentCourse.data.pictureTitle}
                </p>
                {pictureErrorMessage && (
                  <>
                    {pictureErrorMessage.length >= 2 ? (
                      pictureErrorMessage.map((msg, index) => (
                        <p
                          key={index}
                          style={{ fontSize: "11px" }}
                          className="mb-1 text-danger fw-semibold"
                        >
                          * {msg}
                        </p>
                      ))
                    ) : (
                      <p
                        style={{ fontSize: "11px" }}
                        className=" text-danger fw-semibold"
                      >
                        {pictureErrorMessage}
                      </p>
                    )}
                  </>
                )}
              </div>
            )}

            <div>
              <button
                className="btn btn-secondary me-3 mb-3 "
                style={{ width: "85px" }}
                onClick={editCourse}
              >
                Submit
              </button>
              <button
                className="btn btn-outline-secondary mb-3 "
                style={{ width: "85px" }}
                onClick={redirectCourses}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </main>
  );
};

export default EditCourseComponent;
