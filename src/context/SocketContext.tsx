import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import { url } from '../axios/url'
import { useAuth } from './AuthContext'

interface SocketContextType {
    socket: Socket | null;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {

    const { token } = useAuth()
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        if (!token) {
            if (socketRef.current) {
                socketRef.current.disconnect();
                socketRef.current = null;
            }
            return;
        }

        if (socketRef.current) return;

        const socket = io(url, {
            auth: {
                token
            }
        });

        socketRef.current = socket;

        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        return () => {
            socket.disconnect();
            socketRef.current = null;
        };

    }, [token])

    return (
        <SocketContext.Provider value={{ socket: socketRef.current }}>
            {children}
        </SocketContext.Provider>
    )

}

export const useSocket = () => {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocket must be used within SocketProvider");
    }
    return context;
}
