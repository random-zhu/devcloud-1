import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_ENDPOINT(query) {
  return request({
    url: `${keyauth.baseURL}/endpoints`,
    method: "get",
    params: query,
  });
}
