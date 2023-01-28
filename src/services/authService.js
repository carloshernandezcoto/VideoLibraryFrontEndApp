import httpService from "./httpService";
//import config from "./../config.json";
import jwtDecode from "jwt-decode";

// const apiEndpoint = config.apiUrl + "/auth";
const apiEndpoint = "/auth";

httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await httpService.post(apiEndpoint, {
    email,
    password,
  });
  localStorage.setItem("token", jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default { login, logout, getCurrentUser, loginWithJwt, getJwt };
