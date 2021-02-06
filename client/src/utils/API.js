import axios from "axios";

export default {
  getBooks: function() {
    return axios.get("/api/books");
  },
  getBook: function(id) {
    return axios.get("/api/books/" + id);
  },
  deleteBook: function(id) {
    return axios.delete("/api/books/" + id);
  },
  saveBook: function(bookData) {
    return axios.post("/api/books", bookData);
  },
  registerUser: function(userData) {
    return axios.post("/api/register", userData);
  },
  loginUser: function(loginData) {
    return axios.post("/api/login", loginData);
  }
};
