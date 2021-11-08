import request from "@/api/client";
import cmdb from "./settings";

export function SEARCH(params) {
  return request({
    url: `${cmdb.baseURL}/search`,
    method: "get",
    params: params,
  });
}
