import request from "@/api/client";

export function Search(params) {
  return request({
    url: "/search",
    method: "get",
    params: params,
  });
}
