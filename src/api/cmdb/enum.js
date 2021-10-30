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
