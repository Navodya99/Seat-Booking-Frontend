import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "../component/navbar/navbar.jsx";
import Home from "../pages/home/home.jsx";
import Registration from "../pages/registation/registaion.jsx";
import UserProfile from "../pages/userProfile/userProfile.jsx";
import Login from "../pages/login/login.jsx";
import AdminDashboard from "../pages/admindashboad/adminDashboard.jsx";
import BookingManagement from "../component/bookingManagement/bookingManagement.jsx";
import RoutesManagement from "../component/routesManagement/routesManagement.jsx";
import UserManagement from "../component/userManagement/userManagement.jsx";
import { AuthProvider } from '../context/AuthContext.jsx';

function LayoutContent() {
  const location = useLocation();
  
  const isAdminRoute = [
    '/admin-dashboard',
    '/booking-management',
    '/routes-management',
    '/user-management'
  ].includes(location.pathname);

  return (
    <div>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user-profile" element={<UserProfile />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/booking-management" element={<BookingManagement />} />
        <Route path="/routes-management" element={<RoutesManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

function Layout() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Layout;
