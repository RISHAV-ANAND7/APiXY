import axios from "axios";
import { getHeadersAndParams } from "../utils/commonutils";

export const getData = async (formData, jsonText, paramData, headerData) => {
  const apiType = formData.type.toLowerCase();
  const apiUrl = formData.url;
  const apiHeaders = getHeadersAndParams(headerData);
  const apiParams = getHeadersAndParams(paramData);

  try {
    return await axios({
      method: apiType,
      url: apiUrl,
      data: jsonText,
      headers: apiHeaders,
      params: apiParams,
    });
  } catch (error) {
    console.log("Error while getting the response ", error);
    if (error.response) {
      // Return the error response so we can display the status code and error payload
      return error.response;
    }
    return "error";
  }
};
