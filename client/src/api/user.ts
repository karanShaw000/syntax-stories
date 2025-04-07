import axiosInstance from "../lib/axiosInstance";
import { handleAxiosError } from "../lib/axiosUtils";
import { ApiResponse, User } from "../lib/types";


export const fetchUserDetails = async () => {
  try {
    const res = await axiosInstance.get<ApiResponse<{ user: Omit<User, "password">, userBlogsCount: number }>>("/user");
    return res.data;
  } catch (err) {
    throw handleAxiosError(err);
  }
};

export const userSignup = async (signupdetails: { username: string, password: string }) => {
  try {
    const res = await axiosInstance.post<ApiResponse<{ userId: string }>>("/user/register", signupdetails);
    return res.data;
  } catch (err) {
    throw handleAxiosError(err);
  }
};

export const userLogin = async (loginDetails: { username: string, password: string }) => {
  try {
    const res = await axiosInstance.post<ApiResponse<{ userId: string }>>("/user/login", loginDetails);
    return res.data;
  } catch (err) {
    throw (handleAxiosError(err));
  }
};

export const userLogout = async () => {
  try {
    const res = await axiosInstance.post<ApiResponse>("/user/logout");
    return res.data;
  } catch (err) {
    throw handleAxiosError(err);
  }
};

