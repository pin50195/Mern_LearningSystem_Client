import axios from "axios";
const API_URL = "https://mern-learningsystem-server.onrender.com/api/courses";

const check_Token = () => {
  let token;
  if (localStorage.getItem("user")) {
    return (token = JSON.parse(localStorage.getItem("user")).jwt_Token);
  } else {
    return (token = "");
  }
};

class CourseService {
  //講師"新增"課程

  post(courseData) {
    const formData = new FormData();
    formData.append("title", courseData.title);
    formData.append("description", courseData.description);
    formData.append("hour", courseData.hour);
    formData.append("price", courseData.price);
    formData.append("pictureTitle", courseData.pictureTitle);
    formData.append("picture", courseData.picture);

    return axios.post(API_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: check_Token(),
      },
    });
  }

  // 講師"修改"課程
  edit(_id, title, description, hour, price, pictureTitle, picture) {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("hour", hour);
    formData.append("price", price);
    formData.append("pictureTitle", pictureTitle);
    formData.append("picture", picture);

    return axios.patch(`${API_URL}/${_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: check_Token(),
      },
    });
  }

  // 講師"刪除"課程
  delete(_id) {
    return axios.delete(`${API_URL}/${_id}`, {
      headers: { Authorization: check_Token() },
    });
  }

  // 學生註冊課程
  enroll(_id) {
    return axios.post(
      `${API_URL}/enroll/${_id}`,
      {},
      {
        headers: {
          Authorization: check_Token(),
        },
      }
    );
  }

  //找到全部課程
  getAllCourses() {
    return axios.get(`${API_URL}`, {
      headers: { Authorization: check_Token() },
    });
  }
  //使用"課程id"找到課程
  getCourseByID(_id) {
    return axios.get(`${API_URL}/${_id}`, {
      headers: { Authorization: check_Token() },
    });
  }

  //使用"課程名稱"找到課程
  getCourseByName(name) {
    return axios.get(`${API_URL}/findByName/${name}`, {
      headers: { Authorization: check_Token() },
    });
  }

  //使用"講師id"找到講師已開設課程
  get(_id) {
    return axios.get(`${API_URL}/instructor/${_id}`, {
      headers: {
        Authorization: check_Token(),
      },
    });
  }
  //使用"學生id"找到學生已註冊課程
  getEnrolled(_id) {
    return axios.get(`${API_URL}/student/${_id}`, {
      headers: {
        Authorization: check_Token(),
      },
    });
  }
}

export default new CourseService();
