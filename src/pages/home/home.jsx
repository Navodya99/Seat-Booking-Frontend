import React, { useEffect, useState } from "react";
import BusRouteCard from "../../component/busRoutesCard/busRoutesCard";
import { fetchBusRoutes } from "../../api/api";

function Home() {
  const [busRoutes, setBusRoutes] = useState([]);

  useEffect(() => {
    const getBuses = async () => {
      const { data } = await fetchBusRoutes();
      setBusRoutes(data);
    };
    getBuses();
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen ">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">
        Bus Routes
      </h1>
      <div className="max-w-7xl grid gap-4 sm:grid-cols-1 md:grid-cols-2 mx-auto">
        {busRoutes.map((route, index) => (
          <BusRouteCard
            key={index}
            routeName={route.routeName}
            busName={route.busName}
            departureTime={route.departureTime}
            arrivalTime={route.arrivalTime}
            startLocation={route.startLocation}
            endLocation={route.endLocation}
            ticketPrice={route.ticketPrice}
            availableSeatsCount={route.availableSeatsCount}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
