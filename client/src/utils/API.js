import axios from "axios";

export default {
  registerUser: function(userData) {
    return axios.post("/api/register", userData);
  },
  loginUser: function(loginData) {
    return axios.post("/api/login", loginData);
  }
};