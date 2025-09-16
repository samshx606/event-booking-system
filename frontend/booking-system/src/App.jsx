import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Public/Home/Home';
import Footer from "./Components/Footer/Footer";
import About from "./Pages/Public/AboutUs/AboutUs";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import EventList from "./Pages/Events/EventList/EventList";
import AdminDashboard from "./Pages/Admin/Dashboard/AdminDashboard";
import AdminEventList from "./Pages/Events/AdminEventList/AdminEventList";
import CreateEvent from "./Pages/Events/CreateEvent/CreateEvent";
import EditEvent from "./Pages/Events/EditEvent/EditEvent";
import ViewEvent from './Pages/Events/ViewEvent/ViewEvent';
import BookingSuccess from './Pages/Bookings/BookingSuccess/BookingSuccess';
import ViewBookings from './Pages/Bookings/ViewBookings/ViewBookings';
import ViewProfile from './Pages/users/ViewProfile/ViewProfile';
import AdminUserList from './Pages/users/AdminUserList/AdminUserList';
function App() {
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEventList />} />
        <Route path="/admin/events/create" element={<CreateEvent />} />
        <Route path="/admin/events/edit/:id" element={<EditEvent />} />
        <Route path="/events/:id" element={<ViewEvent />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
        <Route path="/users/bookings" element={<ViewBookings />} />
        <Route path="/profile" element={<ViewProfile />} />
        <Route path="/admin/users" element={<AdminUserList />} />
      </Routes>
      
      <Footer />
    </>
  )
}

export default App;
