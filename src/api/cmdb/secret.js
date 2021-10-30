import request from "@/api/client";

export function LIST_SECRET(params) {
  return request({
    url: "/secrets",
    method: "get",
    params: params,
  });
}
