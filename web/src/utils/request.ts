import axios from "axios";
import { getErrorMessage } from "get-error-message";
import { Notyf } from "notyf";

// Create an instance of Notyf
export let isNode;

try {
  isNode = typeof window == "undefined";
} catch (e) {
  isNode = true;
}

export const notyf = isNode
  ? {
      success: (s: any) => {},
      error: (s: any) => {},
    }
  : new Notyf({
      duration: 10000,
    });

export const isLocal = () => {
  if (isNode) {
    return process.env.NODE_ENV == "development";
  }
  return typeof location != "undefined" && location?.host?.includes("localhost");
};

// export const BASE = ``
export const WEB_BASE = isLocal() ? `http://localhost:3000` : `https://personate.ai`;
export const BASE = isLocal() ? `http://localhost:3200` : `https://server.personate.ai`;

export function request(method, functionName, data?) {
  return axios({
    url: BASE + functionName,
    method: method,
    data: data,
    withCredentials: true,
  })
    .then((res) => {
      // notyf.success(getErrorMessage(res));
      return res.data;
    })
    .catch((err) => {
      notyf.error(getErrorMessage(err));
      throw getErrorMessage(err);
    });
}

export function requestNextApi(method, functionName, data?) {
  return axios({
    url: functionName,
    method: method,
    data: data,
  }).then((res) => res.data);
}


export const fetcher = (url: string) => request("GET", url);
