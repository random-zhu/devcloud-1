import request from "@/api/client";
import cmdb from "./settings";

export function LIST_VENDOR(params) {
  return request({
    url: `${cmdb.baseURL}/vendors`,
    method: "get",
    params: params,
  });
}

export function LIST_CRENDENTIAL_TYPE(params) {
  return request({
    url: `${cmdb.baseURL}/crendential_types`,
    method: "get",
    params: params,
  });
}

export function LIST_REGION(params) {
  return request({
    url: `${cmdb.baseURL}/regions`,
    method: "get",
    params: params,
  });
}

export function LIST_RESOURCE_TYPE(params) {
  return request({
    url: `${cmdb.baseURL}/resource_types`,
    method: "get",
    params: params,
  });
}
