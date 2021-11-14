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

export function GET_PROFILE(params) {
  return request({
    url: `${keyauth.baseURL}/profile`,
    method: "get",
    params,
  });
}
