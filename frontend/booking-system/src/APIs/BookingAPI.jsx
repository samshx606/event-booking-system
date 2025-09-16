import axiosInstance from "./axiosInstance";

export const getBookingsByUserId = async (userId, page = 0, size = 10) => {
  const response = await axiosInstance.get(`/api/bookings/user/${userId}`, {
    params: { page, size },
  });
  return response.data;
};

export const createBooking = async (bookingData) => {
  const response = await axiosInstance.post(`/api/bookings`, bookingData);
  return response.data;
};
