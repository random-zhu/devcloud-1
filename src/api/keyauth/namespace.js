import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_NAMESPACE(query) {
  return request({
    url: `${keyauth.baseURL}/namespaces`,
    method: "get",
    params: query,
  });
}

export function DESCRIBE_NAMESPACE(id, query) {
  return request({
    url: `${keyauth.baseURL}/namespaces/${id}`,
    method: "get",
    params: query,
  });
}

export function CREATE_NAMESPACE(data) {
  return request({
    url: `${keyauth.baseURL}/namespaces/`,
    method: "post",
    data,
  });
}

export function DELETE_NAMESPACE(id, query) {
  return request({
    url: `${keyauth.baseURL}/namespaces/${id}`,
    method: "delete",
    params: query,
  });
}
