import request from "@/api/client";
import keyauth from "./settings";

export function CREATE_SUB_ACCOUNT(data) {
  return request({
    url: `${keyauth.baseURL}/sub_users/`,
    method: "post",
    data,
  });
}

export function QUERY_SUB_ACCOUNT(query) {
  return request({
    url: `${keyauth.baseURL}/sub_users/`,
    method: "get",
    params: query,
  });
}

export function DESCRIBE_SUB_ACCOUNT(account, query) {
  return request({
    url: `${keyauth.baseURL}/sub_users/${account}`,
    method: "get",
    params: query,
  });
}

export function UPDATE_SUB_ACCOUNT(account, data) {
  return request({
    url: `${keyauth.baseURL}/sub_users/${account}`,
    method: "patch",
    data: data,
  });
}

export function DELETE_SUB_ACCOUNT(account, query) {
  return request({
    url: `${keyauth.baseURL}/sub_users/${account}`,
    method: "delete",
    params: query,
  });
}

export function RESET_SUB_ACCOUNT_PASSWORD(data) {
  return request({
    url: `${keyauth.baseURL}/password/reset`,
    method: "put",
    data: data,
  });
}

export function GEN_RANDOM_PASSWORD(data) {
  return request({
    url: `${keyauth.baseURL}/password/`,
    method: "post",
    data: data,
  });
}
