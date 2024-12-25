import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8800" }); // Replace with your back-end URL

// Bus Routes API
export const fetchBusRoutes = () => API.get("/api/busRoutes");
export const createBusRoute = (routeData) => API.post("/routes", routeData);