import { useState } from "react";
import BookingManagement from "../../component/bookingManagement/bookingManagement";
import UserManagement from "../../component/userManagement/userManagement";
import RoutesManagement from "../../component/routesManagement/routesManagement";
import DriverManagement from "../../component/driverManagement/driverManagement";

const AdminDashboard = () => {
  const [activeComponent, setActiveComponent] = useState("bookings");

  const renderComponent = () => {
    switch (activeComponent) {
      case "bookings":
        return <BookingManagement />;
      case "users":
        return <UserManagement />;
      case "routes":
        return <RoutesManagement />;
      case "drivers":
        return <DriverManagement />;
      default:
        return <BookingManagement />;
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 min-h-screen bg-gray-800 text-white p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl text-center font-bold mt-10 mb-6">NTC Admin</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => setActiveComponent("bookings")}
                  className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-2">🎫</span>
                  Manage Bookings
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent("users")}
                  className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-2">👥</span>
                  Manage Users
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent("drivers")}
                  className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-2">🚗</span>
                  Manage Drivers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveComponent("routes")}
                  className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
                >
                  <span className="mr-2">🛣️</span>
                  Bus Routes
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => window.location.href = '/'}
            className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <span className="mr-2">🏠</span>
            Home
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}
            className="w-full flex items-center p-2 hover:bg-gray-700 rounded"
          >
            <span className="mr-2">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid">
          {renderComponent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
