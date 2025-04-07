import { axiosInstance, handleAxiosError } from "../lib/axiosUtils";
import { ApiResponse, Blog, PopulatedBlog } from "../lib/types";

export const fetchBlogs = async (page: number) => {
  try {
    const res = await axiosInstance.get<ApiResponse<{ blogs: PopulatedBlog[], currentPage: number, totalPage: number }>>(`/blog?page=${page}`);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const fetchUserBlogs = async ( pageParams: number  ) => {
  try {
    const res = await axiosInstance.get<ApiResponse<{ blogs: PopulatedBlog[], currentPage: number, totalPage: number }>>(`/blog/user?page=${pageParams}`);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
}

export const fetchBlogById = async (id: string) => {
  try {
    const res = await axiosInstance.get<ApiResponse<PopulatedBlog>>(`/blog/${id}`);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const createBlog = async (blogData: Pick<Blog, "title" | "content">) => {
  try {
    const res = await axiosInstance.post<ApiResponse<Pick<Blog, "_id">>>("/blog", blogData);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const updateBlog = async (id: string, blogData: Partial<Blog>) => {
  try {
    const res = await axiosInstance.patch<ApiResponse<Blog>>(`/blog/${id}`, blogData);
    return res.data;
  } catch (err) {
    handleAxiosError(err);
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const res = await axiosInstance.delete<ApiResponse>(`/blog/${id}`);
    return res.data
  } catch (err) {
    handleAxiosError(err);
  }
};

