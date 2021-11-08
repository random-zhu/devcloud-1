import request from "@/api/client";
import cmdb from "./settings";

export function LIST_TASK(params) {
  return request({
    url: `${cmdb.baseURL}/tasks`,
    method: "get",
    params: params,
  });
}

export function CREATE_TASK(data) {
  return request({
    url: `${cmdb.baseURL}/tasks`,
    method: "post",
    data,
  });
}
