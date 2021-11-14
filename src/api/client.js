import axios from "axios";
import store from "@/store";

// http client
const client = axios.create({
  // API请求的base URL
  baseURL: process.env.VUE_APP_BASE_API,
  // 超时时间
  timeout: 5000,
});

// request中间件
client.interceptors.request.use(
  // 成功的处理逻辑
  (request) => {
    // 如果有Token, 带上Token访问
    if (store.getters.accessToken) {
      request.headers["X-OAUTH-TOKEN"] = store.getters.accessToken;
    }
    return request;
  },
  // 错误时的处理逻辑
  (err) => {
    console.log(err);
    return Promise.reject(err);
  }
);

// response中间件
client.interceptors.response.use(
  (response) => {
    const resp = response.data;
    // 判断返回的error code是否为0, 如果为0请求成功
    if (resp.code === 0) {
      console.log(resp);
      return resp;
    }

    // 如果不为0, 请求失败
    console.log(resp);
  },
  (err) => {
    // 错误时的处理逻辑
    console.log(err);

    var message = err;
    if (err.response) {
      const res = err.response.data;
      message = res.reason + ": " + res.message;
    }

    return Promise.reject(message);
  }
);

export default client;
