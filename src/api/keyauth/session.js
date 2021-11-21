import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_LOGIN_LOG(query) {
  return request({
    url: `${keyauth.baseURL}/sessions`,
    method: "get",
    params: query,
  });
}

export function GET_SESSION(id, query) {
  return request({
    url: `${keyauth.baseURL}/sessions/${id}`,
    method: "get",
    params: query,
  });
}
