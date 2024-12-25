import React, { useState } from "react";
import SeatBookingModal from "../modals/seatBookingModal";

const BusRouteCard = ({
  routeName,
  busName,
  departureTime,
  arrivalTime,
  startLocation,
  endLocation,
  ticketPrice,
  availableSeatsCount, // Updated to use availableSeatsCount instead of the full seats array
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  const openModal = () => setIsModalOpen(true);

 

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{routeName}</h2>
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Bus Name:</span> {busName}
        </p>
        <div className="flex justify-between text-gray-600 mb-4">
          <p>
            <span className="font-semibold">Departure:</span> {departureTime}
          </p>
          <p>
            <span className="font-semibold">Arrival:</span> {arrivalTime}
          </p>
        </div>
        <div className="text-gray-600 mb-4">
          <p>
            <span className="font-semibold">Start Location:</span> {startLocation}
          </p>
          <p>
            <span className="font-semibold">End Location:</span> {endLocation}
          </p>
          <p>
            <span className="font-semibold">Ticket Price:</span> ${ticketPrice}
          </p>
        </div>
        <div className="text-gray-600 mb-4">
          <span className="font-semibold">Seats:</span>
          <p>
            {availableSeatsCount >= 1 ? (
              <span className="text-green-500">Available</span>
            ) : (
              <span className="text-red-500">Unavailable</span>
            )}
          </p>
        </div>
      </div>

      {/* Book Now button */}
      <div className="px-6 py-4">
        <button
          onClick={openModal}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
        >
          Book Now!
        </button>
      </div>

      {/* Modal */}
        <SeatBookingModal
        isModalOpen={isModalOpen}
        availableSeatsCount={availableSeatsCount}/>
    </div>
  );
};

export default BusRouteCard;
