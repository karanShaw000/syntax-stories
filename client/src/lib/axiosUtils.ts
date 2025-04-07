import axios from "axios";
import getBaseUrl from "./network";
export const axiosInstance =  axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Generic Axios error handler
export const handleAxiosError = (err: unknown): never => {
  if (axios.isAxiosError(err) && err.response) {
    throw new Error(err.response.data.message || "An error occurred while processing the request.");
  }
  throw new Error("An unexpected error occurred.");
};
