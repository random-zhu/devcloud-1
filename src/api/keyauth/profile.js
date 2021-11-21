import request from "@/api/client";
import keyauth from "./settings";

export function GET_PROFILE() {
  return request({
    url: `${keyauth.baseURL}/profile/`,
    method: "get",
  });
}

export function UPDATE_PROFILE(data) {
  return request({
    url: `${keyauth.baseURL}/profile/`,
    method: "put",
    data,
  });
}

export function GET_MY_DOMAIN() {
  return request({
    url: `${keyauth.baseURL}/profile/domain`,
    method: "get",
  });
}

export function UPDATE_MY_DOMIN(data) {
  return request({
    url: `${keyauth.baseURL}/profile/domain`,
    method: "put",
    data,
  });
}

export function UPDATE_PASSWORD(data) {
  return request({
    url: `${keyauth.baseURL}/password`,
    method: "put",
    data,
  });
}

export function UPDATE_SECURITY_SETTING(data) {
  return request({
    url: `${keyauth.baseURL}/settings/domain/security`,
    method: "put",
    data,
  });
}
