import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_SERVICE(query) {
  return request({
    url: `${keyauth.baseURL}/services`,
    method: "get",
    params: query,
  });
}

export function DESCRIBE_SERVICE(id, query) {
  return request({
    url: `${keyauth.baseURL}/services/${id}`,
    method: "get",
    params: query,
  });
}

export function REFRESH_SERVICE_CLIENT(id, data) {
  return request({
    url: `${keyauth.baseURL}/services/${id}/refresh_client_secret`,
    method: "post",
    data,
  });
}

export function CREATE_SERVICE(data) {
  return request({
    url: `${keyauth.baseURL}/services/`,
    method: "post",
    data,
  });
}

export function DELETE_SERVICE(id, query) {
  return request({
    url: `${keyauth.baseURL}/services/${id}`,
    method: "delete",
    params: query,
  });
}
