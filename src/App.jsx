import { Routes, Route } from "react-router-dom";
import Home from "./pages/public/Home";
import Rooms from "./pages/public/Rooms";
import RoomDetails from "./pages/public/RoomDetails";
import Events from "./pages/public/Events";
import Gallery from "./pages/public/Gallery";
import Contact from "./pages/public/Contact";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminGallery from "./pages/admin/AdminGallery";
import AdminTestimonials from "./pages/admin/AdminTestimonials";
import AdminCMS from "./pages/admin/AdminCMS";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:slug" element={<RoomDetails />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:slug" element={<Events />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<AdminRooms />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
          <Route path="/admin/testimonials" element={<AdminTestimonials />} />
          <Route path="/admin/cms" element={<AdminCMS />} />
        </Route>
      </Routes>
  );
}

export default App;
