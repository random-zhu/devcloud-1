import request from "@/api/client";
import keyauth from "./settings";

export function LOGIN(data, params) {
  return request({
    url: `${keyauth.baseURL}/oauth2/tokens`,
    method: "post",
    auth: {
      username: process.env.VUE_APP_CLIENT_ID,
      password: process.env.VUE_APP_CLIENT_SECRET,
    },
    data,
    params,
  });
}

export function LOGOUT(data, params) {
  return request({
    url: `${keyauth.baseURL}/oauth2/tokens`,
    method: "delete",
    auth: {
      username: process.env.VUE_APP_CLIENT_ID,
      password: process.env.VUE_APP_CLIENT_SECRET,
    },
    data,
    params,
  });
}

export function QUERY_TOKEN(query) {
  return request({
    url: `${keyauth.baseURL}/self/tokens/`,
    method: "get",
    params: query,
  });
}

export function DELETE_TOKEN(data) {
  return request({
    url: `${keyauth.baseURL}/self/tokens/`,
    method: "delete",
    auth: {
      username: process.env.VUE_APP_CLIENT_ID,
      password: process.env.VUE_APP_CLIENT_SECRET,
    },
    data,
  });
}

export function SEND_VERIFY_CODE_BY_PASS(data) {
  return request({
    url: `/${keyauth.baseURL}/verify_code/pass/`,
    method: "post",
    auth: {
      username: process.env.VUE_APP_CLIENT_ID,
      password: process.env.VUE_APP_CLIENT_SECRET,
    },
    data,
  });
}

export function GET_PROFILE(params) {
  return request({
    url: `${keyauth.baseURL}/profile`,
    method: "get",
    params,
  });
}
