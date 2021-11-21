import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_DEPARTMENT(query) {
  return request({
    url: `${keyauth.baseURL}/departments`,
    method: "get",
    params: query,
  });
}

export function DESCRIBE_DEPARTMENT(id, query) {
  return request({
    url: `${keyauth.baseURL}/departments/${id}`,
    method: "get",
    params: query,
  });
}

export function QUERY_SUB_DEPARTMENT(id, query) {
  return request({
    url: `${keyauth.baseURL}/departments/${id}/subs`,
    method: "get",
    params: query,
  });
}

export function CREATE_DEPARTMENT(data) {
  return request({
    url: `${keyauth.baseURL}/departments/`,
    method: "post",
    data,
  });
}

export function UPDATE_DEPARTMENT(id, data) {
  return request({
    url: `${keyauth.baseURL}/departments/${id}`,
    method: "patch",
    data,
  });
}

export function DELETE_DEPARTMENT(id, query) {
  return request({
    url: `${keyauth.baseURL}/departments/${id}`,
    method: "delete",
    params: query,
  });
}

export function JOIN_DEPARTMENT(data) {
  return request({
    url: `${keyauth.baseURL}/join_apply/`,
    method: "post",
    data,
  });
}

export function DESCRIBE_JOIN_APPLY(id, query) {
  return request({
    url: `${keyauth.baseURL}/join_apply/${id}`,
    method: "get",
    params: query,
  });
}

export function QUERY_JOIN_APPLY(query) {
  return request({
    url: `${keyauth.baseURL}/join_apply/`,
    method: "get",
    params: query,
  });
}

export function DEAL_JOIN_APPLY(id, data) {
  return request({
    url: `${keyauth.baseURL}/join_apply/${id}`,
    method: "patch",
    data,
  });
}
