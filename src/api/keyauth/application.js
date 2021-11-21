import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_APPLICATION(query) {
  return request({
    url: `${keyauth.baseURL}/applications`,
    method: "get",
    params: query,
  });
}

export function CREATE_APPLICATION(data) {
  return request({
    url: `${keyauth.baseURL}/applications/`,
    method: "post",
    data,
  });
}

export function DELETE_APPLICATION(id, query) {
  return request({
    url: `${keyauth.baseURL}/applications/${id}`,
    method: "delete",
    params: query,
  });
}
