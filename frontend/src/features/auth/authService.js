import api from "../../app/axios";

const API_URL = "/user/";

async function register(userData) {
  const response = await api.post(API_URL + "register", userData);

  return response.data;
}

async function login(userData) {
  const response = await api.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
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
