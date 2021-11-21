import request from "@/api/client";
import keyauth from "./settings";

export function GET_SYSTEM_SETTING() {
  return request({
    url: `${keyauth.baseURL}/system_config`,
    method: "get",
  });
}

export function TEST_EMAIL_SETTING(data) {
  return request({
    url: `${keyauth.baseURL}/system_config/email/test`,
    method: "post",
    data,
  });
}

export function SET_EMAIL_SETTING(data) {
  return request({
    url: `${keyauth.baseURL}/system_config/email`,
    method: "post",
    data,
  });
}

export function TEST_SMS_SETTING(data) {
  return request({
    url: `${keyauth.baseURL}/system_config/sms/test`,
    method: "post",
    data,
  });
}

export function SET_SMS_SETTING(data) {
  return request({
    url: `${keyauth.baseURL}/system_config/sms`,
    method: "post",
    data,
  });
}

export function SET_VERIFY_CODE_SETTINGT(data) {
  return request({
    url: `${keyauth.baseURL}/system_config/verify_code`,
    method: "post",
    data,
  });
}
