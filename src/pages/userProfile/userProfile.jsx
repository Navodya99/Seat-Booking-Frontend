import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [userBookings, setUserBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/login");
        return;
      }

      if (user.isAdmin) {
        navigate("/admin-dashboard");
      }
    };

    const fetchUserDataAndBookings = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const userResponse = await axios.get(`/api/users/${user._id}`, {
          withCredentials: true,
        });
        setUserData(userResponse.data);

        const bookingsResponse = await axios.get(`/api/book-seats/user/${user._id}`);
        if(bookingsResponse.data.length === 0) {

        }else{
          setUserBookings(bookingsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("user");
          navigate("/login");
        }
        setError("Failed to load user profile or bookings.");
      }
    };

    checkAuth();
    fetchUserDataAndBookings();
  }, [navigate]);

  const handleDeleteBooking = async (bookingId) => {
    try {
      await axios.delete(`/api/book-seats/${bookingId}`);
      setUserBookings((prevBookings) => prevBookings.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error("Error deleting booking:", error);
      setError("Failed to delete booking.");
    }
  };

  if (!userData) {
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">User Profile</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <p className="mt-1 text-lg text-gray-900">{userData.userName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <p className="mt-1 text-lg text-gray-900">{userData.email}</p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mt-10 mb-6">Your Bookings</h3>
        {userBookings.length > 0 ? (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {userBookings.map((booking) => {
      // Combine the time with today's date or another date format for conversion
      const departureDate = new Date(`${new Date().toLocaleDateString()} ${booking.routeId.departureTime}`);
      const arrivalDate = new Date(`${new Date().toLocaleDateString()} ${booking.routeId.arrivalTime}`);

      return (
        <div
          key={booking._id}
          className="border border-gray-200 rounded-lg p-4 bg-gray-50 shadow-sm"
        >
          {/* Route details */}
          <h4 className="text-lg font-semibold text-gray-800 mb-2">
            {booking.routeId.routeName} ({booking.routeId.busName})
          </h4>
          <p className="text-sm text-gray-600">
            <strong>Seats:</strong> {booking.seatNumbers.join(", ")}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Departure:</strong> {departureDate.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Arrival:</strong> {arrivalDate.toLocaleString()}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Start Location:</strong> {booking.routeId.startLocation}
          </p>
          <p className="text-sm text-gray-600">
            <strong>End Location:</strong> {booking.routeId.endLocation}
          </p>
          <p className="text-sm text-gray-600">
            <strong>Ticket Price:</strong> {booking.routeId.ticketPrice} LKR
          </p>
          <p className="text-sm text-gray-600">
            <strong>Status:</strong> {booking.status}
          </p>

          {/* Delete booking button */}
          <button
            onClick={() => handleDeleteBooking(booking._id)}
            className="mt-4 bg-red-500 text-white px-3 py-2 rounded text-sm hover:bg-red-600"
          >
            Delete Booking
          </button>
        </div>
      );
    })}
  </div>
) : (
  <div className="text-center text-gray-600 mt-6">
    <p className="mb-4">No bookings found.</p>
    <a 
      href="/" 
      className="text-blue-500 hover:text-blue-700 font-medium underline"
    >
      Book Seat Now!
    </a>
  </div>
)}


      </div>
    </div>
  );
};

export default UserProfile;
