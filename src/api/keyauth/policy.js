import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_POLICY(query) {
  return request({
    url: `${keyauth.baseURL}/policies/`,
    method: "get",
    params: query,
  });
}

export function CREATE_POLICY(data) {
  return request({
    url: `${keyauth.baseURL}/policies/`,
    method: "post",
    data,
  });
}
