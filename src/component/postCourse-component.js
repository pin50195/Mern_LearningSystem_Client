import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseService from "../services/course.service";

const PostCourseComponent = ({ currentUser, setCurrentUser }) => {
  let [title, setTitle] = useState("");
  let [description, setDescription] = useState("");
  let [price, setPrice] = useState(0);
  let [hour, setHour] = useState(0);
  let [pictureTitle, setPictureTitle] = useState("");
  let [picture, setPicture] = useState("");
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
    const newValue = e.target.value;
    setTitle(newValue);
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
    const newValue = e.target.value;
    setDescription(newValue);
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
    const newValue = Number(e.target.value);
    setHour(newValue);

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
    const newValue = e.target.value;
    setPrice(newValue);
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
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      setPicture(null);
      setPictureTitle("");
      setPictureErrorMessage([
        "File size is too large. Max limit is 2MB.",
        "圖片檔案超過2MB，請重新上傳",
      ]);
    } else {
      setPicture(e.target.files[0]);
      setPictureTitle(e.target.files[0].name);
      setPictureErrorMessage("");
    }
  };

  const postCourse = () => {
    if (
      !(title === "") &&
      !(description === "") &&
      !(price === 0) &&
      !(hour === 0) &&
      !(pictureTitle === "") &&
      !(picture === "") &&
      titleErrorMessage.length +
        descriptionErrorMessage.length +
        hourErrorMessage.length +
        priceErrorMessage.length +
        pictureErrorMessage.length ===
        0
    ) {
      let confirmPost = window.confirm("Post Course? (確定新增課程?) ");
      if (confirmPost) {
        const courseData = {
          title,
          description,
          hour,
          price,
          pictureTitle,
          picture,
        };

        CourseService.post(courseData)
          .then(() => {
            window.alert("Post Success (新增成功)");
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
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <p className="fs-2 fw-bold text-secondary">
            Only instructors can publish new courses.
          </p>
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
      {currentUser && currentUser.found_User.role === "Instructor" && (
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
          <div className="p-1 course-form-group ">
            <p style={{ textAlign: "start" }}>
              Current Image :&nbsp; {pictureTitle}
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
          <div>
            <button className="btn btn-secondary m-2" onClick={postCourse}>
              Submit
            </button>
            <button
              className="btn btn-outline-secondary m-2"
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

export default PostCourseComponent;
