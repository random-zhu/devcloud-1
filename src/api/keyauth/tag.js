import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_TAG(query) {
  return request({
    url: `${keyauth.baseURL}/tags`,
    method: "get",
    params: query,
  });
}

export function QUERY_TAG_VALUE(id, query) {
  return request({
    url: `${keyauth.baseURL}/tags/${id}/values`,
    method: "get",
    params: query,
  });
}

export function DESCRIBE_TAG(id, query) {
  return request({
    url: `${keyauth.baseURL}/tags/${id}`,
    method: "get",
    params: query,
  });
}

export function CREATE_TAG(data) {
  return request({
    url: `${keyauth.baseURL}/tags/`,
    method: "post",
    data,
  });
}

export function DELETE_TAG(id, query) {
  return request({
    url: `${keyauth.baseURL}/tags/${id}`,
    method: "delete",
    params: query,
  });
}
