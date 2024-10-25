import axios from "axios";

const AxiosInstance = (contentType = "application/json") => {
  const axiosInstance = axios.create({
    // withCredentials: true,
    baseURL: "http://localhost:3000/",
  });

  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = "";
      config.headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": contentType
      };

      return config;
    },
    (err) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (res) => res.data,
    (err) => Promise.reject(err)
  );
  return axiosInstance;
};

export default AxiosInstance;
