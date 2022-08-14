import request from "@/network/request";
import qs from 'qs'

export function getDataUv(startTime, endTime) {
  return request({
    url: "/data/uv",
    method: "get",
    params: {
      startTime,
      endTime
    }
  })
}

export function getDataDau(startTime, endTime) {
  return request({
    url: "/data/dau",
    method: "get",
    params: {
      startTime,
      endTime
    }
  })
}