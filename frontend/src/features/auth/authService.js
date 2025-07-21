import axios from "axios";

const API_URL = "/api/users/";

async function register(userData) {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
}

async function login(userData) {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user".JSON.stringify(response.data));
  }

  return response.data;
}

function logout() {
  localStorage.removeItem("user");
}

const authService = {
  register,
  login,
  logout,
};

export default authService;
