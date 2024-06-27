import axios from "axios";
const API_URL = "https://mern-learningsystem-server.onrender.com/api/user";

// 修改

class AuthService {
  register(userName, email, password, role) {
    return axios.post(API_URL + "/register", {
      userName,
      email,
      password,
      role,
    });
  }

  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
