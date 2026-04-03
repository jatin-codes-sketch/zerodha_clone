import axios from "axios";

export default axios.create({
  baseURL: "https://zerodha-clone-ag7s.onrender.com/api/v1",
  withCredentials: true,
});