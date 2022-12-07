import nodeFetch from "node-fetch";
import { logError } from "./logs.js";

const API_KEY = "3a655eb75292bb16b2cf4329";

async function standardConvert(base: string) {
  try {
    const result = await nodeFetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${base}`
    );
    const data: any = await result.json();
    if (data.result === "error") {
      throw data["error-type"];
    }
    return data.conversion_rates;
  } catch (error) {
    logError(error);
  }
}

async function pairConvert(base: string, target: string, amount: number) {
  try {
    const result = await nodeFetch(
      `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${base}/${target}/${amount}`
    );
    const data: any = await result.json();
    if (data.result === "error") {
      throw data["error-type"];
    }
    return data.conversion_result;
  } catch (error) {
    logError(error);
  }
}

export { standardConvert, pairConvert };
