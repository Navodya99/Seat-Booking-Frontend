import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SeatBookingModal({ routeId, isModalOpen, onClose }) {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatus, setSeatStatus] = useState([]);
  const [availableSeatsCount, setAvailableSeatsCount] = useState(0);

  useEffect(() => {
    if (isModalOpen) {
      axios.get(`/api/busRoutes/${routeId}`).then((response) => {
        const { seatStatus, availableSeatsCount } = response.data;
        setSeatStatus(seatStatus);
        setAvailableSeatsCount(availableSeatsCount);
      });
    }
  }, [isModalOpen, routeId]);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter((seat) => seat !== seatNumber);
      } else {
        return [...prevSeats, seatNumber];
      }
    });
  };

  const navigate = useNavigate();

  const handleConfirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat!");
      return;
    }
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user._id;
    try {
      const response = await axios.post("/api/book-seats", {
        routeId,
        selectedSeats,
        userId,
      });

      const { seatStatus, availableSeatsCount } = response.data.route;
      setSeatStatus(seatStatus);
      setAvailableSeatsCount(availableSeatsCount);
      setSelectedSeats([]);
      alert("Booking successful!");
      navigate("/user-profile"); // Redirect to the success page
    } catch (error) {
      console.error("Error booking seats:", error);
      alert("Booking failed. Please try again.");
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-80">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Select Seats</h3>
        <div className="text-gray-600 mb-4">
          <p>
            <span className="font-semibold">Available Seats:</span> {availableSeatsCount}
          </p>
          {availableSeatsCount > 0 ? (
            <div className="grid grid-cols-6 gap-x-10 gap-y-5 mt-">
              {seatStatus.map((isAvailable, index) => (
                <div key={index} className="flex flex-col items-center">
                  <button
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
        </div>

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
          >
            Close
          </button>
          <button
            className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeatBookingModal;
