import { useEffect, useState } from "react";

const BookingManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState([]);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [passengers, setPassengers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    routeId: "",
    status: "pending",
  });

  // Fetch bookings on component mount
  useEffect(() => {
    fetchBookings();
  }, []);

  // Fetch route details when selectedRoute changes
  useEffect(() => {
    if (selectedRoute) {
      fetchRoutes();
    }
  }, [selectedRoute]);

  const fetchBookings = async () => {
    try {
      const response = await fetch("/api/book-seats");
      const data = await response.json();
      setBookings(data);
      const responseRoutes = await fetch("/api/busRoutes");
      const routes = await responseRoutes.json();
      setRoutes(routes);
      const responseDrivers = await fetch("/api/users");
      const passengers = await responseDrivers.json();
      setPassengers(passengers);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const fetchRoutes = async () => {
    try {
      const response = await fetch(`/api/busRoutes/${selectedRoute}`);
      const { seatStatus, availableSeatsCount } = await response.json();
      setSeatStatus(seatStatus);
      setAvailableSeatsCount(availableSeatsCount);
    } catch (error) {
      console.error("Error fetching route details:", error);
    }
  };

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter((seat) => seat !== seatNumber); // Deselect the seat
      } else {
        return [...prevSeats, seatNumber]; // Select the seat
      }
    });
  };
  
  
  

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the selectedSeats directly to formData
    const updatedFormData = { ...formData, selectedSeats };

    try {
      const url = isEditing
        ? `/api/book-seats/${selectedBooking._id}`
        : "/api/book-seats";
      const method = isEditing ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      });

      if (response.ok) {
        fetchBookings();
        resetForm();
      }
    } catch (error) {
      console.error("Error saving booking:", error);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData({
      userId: booking.userId._id,
      routeId: booking.routeId._id,
      status: booking.status,
    });
     // Set selected seats from booking data
    setSelectedRoute(booking.routeId._id); // Set selectedRoute from booking data
    setSelectedSeats(booking.seatNumbers); // Set selected seats from booking data
    fetchRoutes(); // Fetch route details for selected booking
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      try {
        const response = await fetch(`/api/book-seats/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          fetchBookings();
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
      }
    }
  };

  const resetForm = () => {
    setFormData({
      userId: "",    // Reset to empty
      routeId: "",   // Reset to empty
      status: "pending", // Default status
    });
    setSelectedSeats([]); // Reset selected seats
    setSelectedBooking(null); // Reset selected booking
    setIsEditing(false); // Reset editing state
    setAvailableSeatsCount(0); // Reset available seats count
  };
  
  
  

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Booking Management</h2>

      {/* Booking Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="userId" className="block text-gray-700 font-medium">
              User
            </label>
            <select
              id="userId"
              name="userId"
              className="border p-2 rounded"
              value={formData.userId}
              onChange={handleInputChange}
              required
            >
              <option value="">Select User</option>
              {passengers.map((passenger) => (
                <option key={passenger._id} value={passenger._id}>
                  {passenger.userName}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="routeId" className="block text-gray-700 font-medium">
              Route
            </label>
            <select
              id="routeId"
              name="routeId"
              className="border p-2 rounded"
              value={formData.routeId}
              onChange={(e) => {
                handleInputChange(e);
                setSelectedRoute(e.target.value); // Update selectedRoute when changed
              }}
              required
            >
              <option value="">Select Route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routeName}
                </option>
              ))}
            </select>
          </div>
          {availableSeatsCount > 0 ? (
  <div className="grid grid-cols-6 gap-x-10 gap-y-5 mt-">
    {seatStatus.map((isAvailable, index) => (
      <div key={index} className="flex flex-col items-center">
        <button
        type="button" 
          onClick={() => isAvailable && handleSeatSelection(index + 1)}
          disabled={!isAvailable}
          className={`${
            selectedSeats.includes(index + 1)
              ? "bg-green-500"
              : isAvailable
              ? "bg-gray-300"
              : "bg-red-500"
          } w-12 h-12 flex items-center justify-center rounded-md text-white`}
        >
          {index + 1}
        </button>
      </div>
    ))}
  </div>
) : (
  <p className="text-red-500">No seats available</p>
)}


          <div className="mb-4">
            <label
              htmlFor="status"
              className="block text-gray-700 font-medium"
            >
              Status
            </label>
            <select
              id="status"
              name="status"
              className="border p-2 rounded"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="mb-4">
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              {isEditing ? "Update Booking" : "Create Booking"}
            </button>
          </div>
        </form>
      </div>

      {/* Booking List */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Bookings</h3>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User</th>
              <th className="px-4 py-2 border">Route</th>
              <th className="px-4 py-2 border">Seats</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking._id}>
                <td className="px-4 py-2 border">{booking.userId.userName}</td>
                <td className="px-4 py-2 border">{booking.routeId.routeName}</td>
                <td className="px-4 py-2 border">{booking.seatNumbers.join(", ")}</td>
                <td className="px-4 py-2 border">{booking.status}</td>
                <td className="px-4 py-2 border">
                  <button
                    className="text-blue-500"
                    onClick={() => handleEdit(booking)}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 ml-2"
                    onClick={() => handleDelete(booking._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingManagement;
