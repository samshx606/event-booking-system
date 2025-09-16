import { Route, Routes } from 'react-router-dom';
import Navbar from "./Components/Navbar/Navbar";
import Home from './Pages/Public/Home/Home';
import Footer from "./Components/Footer/Footer";
import About from "./Pages/Public/AboutUs/AboutUs";
import Contact from "./Pages/Public/Contact/Contact";
import Login from "./Pages/Auth/Login/Login";
import Register from "./Pages/Auth/Register/Register";
import EventList from "./Pages/Events/EventList";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import AdminEventList from "./Pages/Admin/Events/AdminEventList";
import CreateEvent from "./Pages/Admin/Events/CreateEvent";
import EditEvent from "./Pages/Admin/Events/EditEvent";
import ViewEvent from './Pages/Admin/Events/ViewEvent';
import UserEventList from './Pages/users/UserEventList';
import BookingSuccess from './Pages/users/BookingSuccess';
import ViewBookings from './Pages/Bookings/ViewBookings';
function App() {
  return (
    <>
    <Navbar/>

    <Routes>
        <Route path="/" element= {
          <Home/>
        } />

        <Route path="/about" element= {
          <About/>
        } />

        <Route path="/contact" element= {
          <Contact/>
        } />

        <Route path="/login" element= {
          <Login/>
        } />
        
        <Route path="/register" element= {
          <Register />
        } />

        <Route path="/events" element= {
          <EventList />
        } />

        <Route path="/admins/dashboard" element={<AdminDashboard />} />
        <Route path="/admins/events" element={<AdminEventList/>} />
        <Route path="/admins/events/create" element={<CreateEvent/>} />
        <Route path="admins/events/edit/:id" element={<EditEvent/>} />
        <Route path="/events/:id" element={<ViewEvent/>} />
        <Route path="/users/events" element={<UserEventList/>} />
        <Route path="booking-success" element={<BookingSuccess/>} />
        <Route path="/users/bookings" element={<ViewBookings/>} />

      </Routes>
      
      <Footer/>
    </>
  )
}

export default App;
