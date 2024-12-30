import axios from 'axios';
import { useEffect, useState } from 'react';

export default function BusRoutes() {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    routeName: '',
    busName: '',
    startLocation: '',
    endLocation: '',
    departureTime: '',
    arrivalTime: '',
    ticketPrice: '',
    driverId: '',
    availableSeatsCount: 33
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const fetchRoutes = async () => {
    try {
      const response = await axios.get('/api/busRoutes', {
        withCredentials: true
      });
      setRoutes(response.data);
      const responseDrivers = await fetch('/api/drivers');
      const data = await responseDrivers.json();
      setDrivers(data);
      setIsLoading(false);
    } catch (err) {
      setError('Failed to fetch routes');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.type === 'number' 
      ? Number(e.target.value)
      : e.target.value;
    
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/busRoutes/${editingId}`, formData, {
          withCredentials: true
        });
      } else {
        await axios.post('/api/busRoutes', {
          ...formData,
          seatStatus: Array(33).fill(true)
        }, {
          withCredentials: true
        });
      }
      fetchRoutes();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save route');
    }
  };

  

  const handleEdit = (route) => {
    setFormData({
      routeName: route.routeName,
      busName: route.busName,
      startLocation: route.startLocation,
      endLocation: route.endLocation,
      departureTime: route.departureTime,
      arrivalTime: route.arrivalTime,
      ticketPrice: route.ticketPrice,
      availableSeatsCount: route.availableSeatsCount,
      driverId: route.driverId?.['_id'] ?? "",
    });
    setIsEditing(true);
    setEditingId(route._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this route?')) {
      try {
        await axios.delete(`/api/busRoutes/${id}`, {
          withCredentials: true
        });
        fetchRoutes();
      } catch (err) {
        setError('Failed to delete route');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      routeName: '',
      busName: '',
      startLocation: '',
      endLocation: '',
      departureTime: '',
      arrivalTime: '',
      ticketPrice: '',
      driverId: '',
      availableSeatsCount: 33
    });
    setIsEditing(false);
    setEditingId(null);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Bus Routes Management</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            name="routeName"
            value={formData.routeName}
            onChange={handleInputChange}
            placeholder="Route Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="busName"
            value={formData.busName}
            onChange={handleInputChange}
            placeholder="Bus Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="startLocation"
            value={formData.startLocation}
            onChange={handleInputChange}
            placeholder="Start Location"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            name="endLocation"
            value={formData.endLocation}
            onChange={handleInputChange}
            placeholder="End Location"
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            name="departureTime"
            value={formData.departureTime}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="time"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleInputChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="ticketPrice"
            value={formData.ticketPrice}
            onChange={handleInputChange}
            placeholder="Ticket Price"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            name="availableSeatsCount"
            value={formData.availableSeatsCount}
            onChange={handleInputChange}
            placeholder="Available Seats"
            max="33"
            min="0"
            className="border p-2 rounded"
            required
          />
          <div>
    <select
      name="driverId"
      value={formData.driverId}
      onChange={handleInputChange}
      className="border p-2 rounded"
      required
    >
      <option value="">Select Driver</option>
      {drivers.map((driver) => (
        <option key={driver._id} value={driver._id}>
          {driver.name} - {driver.licenseNo}
        </option>
      ))}
    </select>
  </div>
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {isEditing ? 'Update Route' : 'Add Route'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr>
              <th className="border p-2">Route Name</th>
              <th className="border p-2">Bus Name</th>
              <th className="border p-2">Start Location</th>
              <th className="border p-2">End Location</th>
              <th className="border p-2">Departure</th>
              <th className="border p-2">Arrival</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Available Seats</th>
              <th className="border p-2">Driver</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route) => (
              <tr key={route._id}>
                <td className="border p-2">{route.routeName}</td>
                <td className="border p-2">{route.busName}</td>
                <td className="border p-2">{route.startLocation}</td>
                <td className="border p-2">{route.endLocation}</td>
                <td className="border p-2">{route.departureTime}</td>
                <td className="border p-2">{route.arrivalTime}</td>
                <td className="border p-2">${route.ticketPrice}</td>
                <td className="border p-2">{route.availableSeatsCount}/33</td>
                <td className="border p-2">
      {route.driverId ? (
        <>
          <span>{route.driverId.name}</span> {/* Display driver's name */}
          <br />
          <span>{route.driverId.licenseNo}</span> {/* Display driver's license number */}
        </>
      ) : (
        'No Driver Assigned'
      )}
      </td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(route)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(route._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
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
}
