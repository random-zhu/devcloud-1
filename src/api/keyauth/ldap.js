import request from "@/api/client";
import keyauth from "./settings";

export function QUERY_DOMAIN_LDAP(query) {
  return request({
    url: `${keyauth.baseURL}/settings/ldap`,
    method: "get",
    headers: { Skip404: true },
    params: query,
  });
}

export function SAVE_DOMAIN_LDAP(data, params) {
  return request({
    url: `${keyauth.baseURL}/settings/ldap/`,
    method: "post",
    params: params,
    data,
  });
}

export function CHECK_DOMAIN_LDAP() {
  return request({
    url: `${keyauth.baseURL}/settings/ldap/conn_check`,
    method: "post",
  });
}
