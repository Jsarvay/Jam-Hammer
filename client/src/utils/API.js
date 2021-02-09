import axios from 'axios';

export default {
  getSongs: function () {
    return axios.get('/api/song');
  },
  // saveSongs: function (id) {
  //   return axios.get('/api/songs/' + id);
  // },
  getUser: function (id) {
    return axios.get('/api/users/' + id);
  },
  // deleteSongs: function(id) {
  //   return axios.delete("/api/songs/" + id);
  // },

  registerUser: function (userData) {
    return axios.post('/api/register', userData);
  },
  loginUser: function (loginData) {
    return axios.post('/api/login', loginData);
  }
};
