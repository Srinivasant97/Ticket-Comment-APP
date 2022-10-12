import { makeRequest } from "./apiService";

export function signUp(payload) {
  return makeRequest("/user/create/", {
    method: "POST",
    data: payload,
  });
}

export function logIn(payload) {
  return makeRequest("/user/login/", {
    method: "POST",
    data: payload,
  });
}
