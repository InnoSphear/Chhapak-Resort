import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Experiences from "./pages/public/Experiences";
import ExperienceDetail from "./pages/public/ExperienceDetail";
import Venues from "./pages/public/Venues";
import Gallery from "./pages/public/Gallery";
import Amenities from "./pages/public/Amenities";
import Inquiry from "./pages/public/Inquiry";
import Contact from "./pages/public/Contact";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import AdminInquiries from "./pages/admin/AdminInquiries";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminCMS from "./pages/admin/AdminCMS";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <div className="bg-gray-700">
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/experiences" element={<Experiences />} />
      <Route path="/experiences/:slug" element={<ExperienceDetail />} />
      <Route path="/venues" element={<Venues />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/amenities" element={<Amenities />} />
      <Route path="/inquiry" element={<Inquiry />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/admin/login" element={<AdminLogin />} />

      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/inquiries" element={<AdminInquiries />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route path="/admin/cms" element={<AdminCMS />} />
      </Route>
    </Routes>
    </div>
  );
}

export default App;
