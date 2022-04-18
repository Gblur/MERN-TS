import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getAllPosts = () => api.get(`/posts`);
export const createPosts = (payload: any) => api.post(`/posts`, payload);
export const updatePostById = (id: any, payload: any) =>
  api.patch(`/posts/${id}`, payload);
export const deletePostById = (id: any) => api.delete(`/posts/${id}`);

const apis = {
  createPosts,
  getAllPosts,
  updatePostById,
  deletePostById,
};

export default apis;
