import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { url } from "../axios/url";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./AuthContext";

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
    const socketRef = useRef<Socket | null>(null);
    const [socket, setSocket] = useState<Socket | null>(null);
    const { token } = useAuth();

    useEffect(() => {
        if (!token) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
                setSocket(null);
            }
            return;
        }

        if (socketRef.current) return;

        const newSocket = io(url, {
            auth: {
                token
            }
        });

        socketRef.current = newSocket;
        setSocket(newSocket);

        newSocket.on("connect", () => {
            console.log("Socket connected", newSocket.id)
        });

        newSocket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            newSocket.disconnect();
            socketRef.current = null;
            setSocket(null);
        }
    }, [token])

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within an SocketProvider");
    }
    return context;
};