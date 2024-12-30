
const SideAdminPanel = ({ setActiveComponent }) => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white p-4">
      <h2 className="text-xl font-bold my-6">NTC Admin</h2>
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
  );
};

export default SideAdminPanel;
