import axiosInstance from "./axiosInstance";

export const makeAdmin = async (userId) => {
  const response = await axiosInstance.put(`/api/admin/users/${userId}/promote`);
  return response.data;
};
