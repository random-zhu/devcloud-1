import request from "@/api/client";
import workflow from "./settings";

export function QUERY_DEPLOY(query) {
  return request({
    url: `${workflow}/deploys`,
    method: "get",
    params: query,
  });
}
