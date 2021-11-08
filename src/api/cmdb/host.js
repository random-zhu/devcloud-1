import request from "@/api/client";
import cmdb from "./settings";

export function LIST_HOST(params) {
  return request({
    url: `${cmdb.baseURL}/hosts`,
    method: "get",
    params: params,
  });
}

export function GET_HOST(id, params) {
  return request({
    url: `${cmdb.baseURL}/hosts/${id}`,
    method: "get",
    params: params,
  });
}
