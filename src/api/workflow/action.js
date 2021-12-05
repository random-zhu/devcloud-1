import request from "@/api/client";
import workflow from "./settings";

export function QUERY_ACTION(query) {
  return request({
    url: `${workflow}/actions`,
    method: "get",
    params: query,
  });
}

export function QUERY_RUNNER(query) {
  return request({
    url: `${workflow}/runners`,
    method: "get",
    params: query,
  });
}

export function CREATE_ACTION(data) {
  return request({
    url: `${workflow}/actions/`,
    method: "post",
    data,
  });
}

export function DELETE_ACTION(key, query) {
  return request({
    url: `${workflow}/actions/${key}`,
    method: "delete",
    params: query,
  });
}
