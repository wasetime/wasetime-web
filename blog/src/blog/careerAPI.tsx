// utils/careerAPI.js

import axios from "axios";

export default axios.create({
  baseURL: "https://api.wasedatime.com/staging/feeds?offset=0&limit=10",
  responseType: "json"
});