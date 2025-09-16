import axiosInstance from "./axiosInstance";

export const getEventById = async (id) => {
  const response = await axiosInstance.get(`/api/events/${id}`);
  return response.data;
};

export const getAllEvents = async (page = 0, size = 10, sort = "title") => {
  const response = await axiosInstance.get(`/api/events`, {
    params: { page, size, sort },
  });
  return response.data;
};

export const createEvent = async (eventData) => {
  const response = await axiosInstance.post(`/api/events`, eventData);
  return response.data;
};

export const updateEvent = async (id, eventData) => {
  const response = await axiosInstance.put(`/api/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id) => {
  await axiosInstance.delete(`/api/events/${id}`);
};
