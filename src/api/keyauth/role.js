import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_ROLE(query) {
  return request({
    url: `${keyauth.baseURL}/roles`,
    method: "get",
    params: query,
  });
}

export function DESC_ROLE(id, query) {
  return request({
    url: `${keyauth.baseURL}/roles/${id}`,
    method: "get",
    params: query,
  });
}

export function CREATE_ROLE(data) {
  return request({
    url: `${keyauth.baseURL}/roles/`,
    method: "post",
    data,
  });
}

export function DELETE_ROLE(id, query) {
  return request({
    url: `${keyauth.baseURL}/roles/${id}`,
    method: "delete",
    params: query,
  });
}

export function LIST_RESOURCE(query) {
  return request({
    url: `${keyauth.baseURL}/resources/`,
    method: "get",
    params: query,
  });
}

export function LIST_ROLE_PERMISSION(id) {
  return request({
    url: `${keyauth.baseURL}/roles/${id}/permissions/`,
    method: "get",
  });
}

export function ADD_PERMISSION_TO_ROLE(id, data) {
  return request({
    url: `${keyauth.baseURL}/roles/${id}/permissions/`,
    method: "post",
    data,
  });
}

export function REMOVE_PERMISSION_FROM_ROLE(id, data) {
  return request({
    url: `${keyauth.baseURL}/roles/${id}/permissions/`,
    method: "delete",
    data,
  });
}

export function UPDATE_PERMISSION(id, data) {
  return request({
    url: `${keyauth.baseURL}/permissions/${id}`,
    method: "put",
    data,
  });
}
