import axios from "axios";
import { io } from "socket.io-client";

const url = import.meta.env.VITE_PROJECT_NODE_URL;

export const API = axios.create({
    baseURL: url,
    withCredentials: true,
});

export const socket = io(url);

