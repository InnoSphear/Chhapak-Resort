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
  getRooms: () => api.get("/rooms"),
  getRoom: (slug) => api.get(`/rooms/${slug}`),
  getEvents: () => api.get("/events"),
  getEvent: (slug) => api.get(`/events/${slug}`),
  getGallery: (params) => api.get("/gallery", { params }),
  getTestimonials: () => api.get("/testimonials"),
  submitBooking: (data) => api.post("/bookings", data),
  submitEventInquiry: (data) => api.post("/events/inquiry", data),
};

export const authApi = {
  login: (credentials) => api.post("/auth/login", credentials),
  getProfile: () => api.get("/auth/profile"),
};

export const adminApi = {
  getStats: () => api.get("/admin/dashboard"),
  getRooms: () => api.get("/admin/rooms"),
  createRoom: (data) => api.post("/admin/rooms", data),
  updateRoom: (id, data) => api.put(`/admin/rooms/${id}`, data),
  deleteRoom: (id) => api.delete(`/admin/rooms/${id}`),
  getBookings: () => api.get("/admin/bookings"),
  updateBooking: (id, data) => api.put(`/admin/bookings/${id}`, data),
  getEvents: () => api.get("/admin/events"),
  createEvent: (data) => api.post("/admin/events", data),
  updateEvent: (id, data) => api.put(`/admin/events/${id}`, data),
  deleteEvent: (id) => api.delete(`/admin/events/${id}`),
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
};

export default api;
