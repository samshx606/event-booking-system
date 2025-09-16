import axiosInstance from "./axiosInstance";

export const getMyProfile = async () => {
  const response = await axiosInstance.get("/api/users/me");
  return response.data;
};

export const deleteMyProfile = async () => {
  await axiosInstance.delete(`/api/users/me`);
};

export const getAllUsers = async (page = 0, size = 10) => {
  const response = await axiosInstance.get(`/api/users`, {
    params: { page, size },
  });
  return response.data;
};

export const deleteUser = async (id) => {
  await axiosInstance.delete(`/api/users/${id}`);
};
