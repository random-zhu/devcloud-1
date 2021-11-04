import request from "@/api/client";

export function LIST_TASK(params) {
  return request({
    url: "/tasks",
    method: "get",
    params: params,
  });
}

export function CREATE_TASK(data) {
  return request({
    url: "/tasks",
    method: "post",
    data,
  });
}
