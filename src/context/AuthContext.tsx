import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../axios/url";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const tokenResponse = await API.post("/auth/login", { email, password });
        console.log(tokenResponse.data.token)
        setToken(tokenResponse.data.token);
        localStorage.setItem("token", tokenResponse.data.token);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};