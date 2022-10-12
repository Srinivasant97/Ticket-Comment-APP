import axios from "axios";

const api = axios.create({
  baseUrl: process.env.REACT_APP_API_URL,
});

export function makeRequest(url, options) {
  const endPoint = process.env.REACT_APP_API_URL + url;
  return api(endPoint, options)
    .then((res) => res.data)
    .catch((e) => Promise.reject("Something went Wrong"));
}
