import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("adminToken");
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export const publicApi = {
  getOverview: () => api.get("/public/overview"),
  getEvents: () => api.get("/events"),
  getEvent: (slug) => api.get(`/events/${slug}`),
  getGallery: (params) => api.get("/gallery", { params }),
  getTestimonials: () => api.get("/testimonials"),
  submitEventInquiry: (data) => api.post("/events/inquiry", data),
  submitContact: (data) => api.post("/public/contact", data),
};

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/profile"),
};

export const adminApi = {
  getStats: () => api.get("/admin/dashboard"),
  getInquiries: () => api.get("/admin/inquiries"),
  getInquiry: (id) => api.get(`/admin/inquiries/${id}`),
  updateInquiry: (id, data) => api.put(`/admin/inquiries/${id}`, data),
  deleteInquiry: (id) => api.delete(`/admin/inquiries/${id}`),
  getGallery: () => api.get("/admin/gallery"),
  createGalleryItem: (data) => api.post("/admin/gallery", data),
  updateGalleryItem: (id, data) => api.put(`/admin/gallery/${id}`, data),
  deleteGalleryItem: (id) => api.delete(`/admin/gallery/${id}`),
  getTestimonials: () => api.get("/admin/testimonials"),
  createTestimonial: (data) => api.post("/admin/testimonials", data),
  updateTestimonial: (id, data) => api.put(`/admin/testimonials/${id}`, data),
  deleteTestimonial: (id) => api.delete(`/admin/testimonials/${id}`),
  getCmsContent: () => api.get("/cms"),
  updateCmsContent: (key, value) => api.put(`/cms/${key}`, { value }),
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append("file", file);
    return api.post("/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
};

export default api;
