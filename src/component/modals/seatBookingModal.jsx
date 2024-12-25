import React, { useState } from "react";



function SeatBookingModal({availableSeatsCount,isModalOpen}) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const handleSeatSelection = (seatNumber) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seatNumber)) {
        return prevSeats.filter((seat) => seat !== seatNumber); 
      } else {
        return [...prevSeats, seatNumber]; 
      }
    });
  };
  return (
    
   <>{isModalOpen &&  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
    <div className="bg-white p-6 rounded-lg w-80">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Select Seats</h3>
      <div className="text-gray-600 mb-4">
  <p>
    <span className="font-semibold">Available Seats:</span>
  </p>
  
  {availableSeatsCount > 0 ? (
    <div className="grid grid-cols-6 gap-x-10 gap-y-5 mt-">
      {[...Array(availableSeatsCount)].map((_, index) => (
        <div key={index} className="flex flex-col items-center">
          <button
            onClick={() => handleSeatSelection(index + 1)}
            className={`${
              selectedSeats.includes(index + 1)
                ? "bg-green-500"
                : "bg-gray-300"
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
          onClick={()=>{}}
          className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-700"
        >
          Close
        </button>
        <button
          className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
          onClick={() => alert(`Booking seats: ${selectedSeats.join(", ")}`)}
        >
          Confirm Booking
        </button>
      </div>
    </div>
  </div> }</>
  );
}

export default SeatBookingModal;
