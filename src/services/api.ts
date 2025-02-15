import axios from "axios";

export const api = axios.create({
    baseURL: "https://xbizit-pizzaria-backend.vercel.app",
});
