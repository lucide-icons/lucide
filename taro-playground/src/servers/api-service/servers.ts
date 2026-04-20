/* eslint-disable import/prefer-default-export */
import HTTPREQUEST from "../../utils/request/http";

export const getResultData_servers = (postData) => {
  return HTTPREQUEST.get("/api/white-screen/search", postData);
};
