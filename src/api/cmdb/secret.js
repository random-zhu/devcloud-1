import request from "@/api/client";
import cmdb from "./settings";

export function LIST_SECRET(params) {
  return request({
    url: `${cmdb.baseURL}/secrets`,
    method: "get",
    params: params,
  });
}

export function ADD_SECRET(data, params) {
  return request({
    url: `${cmdb.baseURL}/secrets`,
    method: "post",
    data,
    params,
  });
}

export function DELETE_SECRET(id, params) {
  return request({
    url: `${cmdb.baseURL}/secrets/${id}`,
    method: "delete",
    params,
  });
}
