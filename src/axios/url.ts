import axios from "axios";

const url = import.meta.env.VITE_PROJECT_NODE_URL;

export const API = axios.create({
    baseURL: url,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
    }
});