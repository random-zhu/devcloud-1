import request from "@/api/client";

export function LIST_VENDOR(params) {
  return request({
    url: "/vendors",
    method: "get",
    params: params,
  });
}

export function LIST_CRENDENTIAL_TYPE(params) {
  return request({
    url: "/crendential_types",
    method: "get",
    params: params,
  });
}

export function LIST_REGION(params) {
  return request({
    url: "/regions",
    method: "get",
    params: params,
  });
}

export function LIST_RESOURCE_TYPE(params) {
  return request({
    url: "/resource_types",
    method: "get",
    params: params,
  });
}
