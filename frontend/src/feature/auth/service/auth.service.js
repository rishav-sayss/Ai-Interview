import axios from "axios";

const AuthapiInsatance = axios.create({
  baseURL: "http://localhost:3000/api/auth",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  let response = await AuthapiInsatance.post("/register", {
    username,
    email,
    password,
  });
  return response.data
}

export async function  login({ email, password }) {
  let response = await AuthapiInsatance.post("/login", {
    email,
    password,
  });
  return response.data
}

export async function logout() {
  let response = await AuthapiInsatance.post("/logout");
  return response.data
}

export async function getuser() {
  let response = await AuthapiInsatance.get("/me");
  return response.data
}






