import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API,
});

api.interceptors.request.use(async (config) => config);

api.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    throw error;
  }
);

export default api;
