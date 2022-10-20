import axios from "axios";

type methods = "POST" | "GET" | "PUT" | "DELETE";

axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers = {
  "Content-Type": "application/json;charset=UTF-8",
};

export const apiRequest = (method: methods, url: string, data: any) =>
  axios({
    url,
    method,
    data,
  });
