import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const getMenus = () => API.get("/menus");
export const placeOrder = (data) => API.post("/orders", data);
