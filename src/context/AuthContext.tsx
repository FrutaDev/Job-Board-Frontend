import React, { createContext, useContext, useState, useEffect } from "react";
import { API } from "../axios/url";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => void;
    logout: () => void;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await API.post('/auth/refresh');
                const newToken = response.data.token;
                setToken(newToken);
            } catch (error: any) {
                setToken(null);
                console.error("error", error);
            } finally {
                setLoading(false);
            }
        };

        const requestIntercept = API.interceptors.request.use(
            config => {
                if (!config.headers['Authorization'] && token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = API.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                const status = error?.response?.status;
                const url = prevRequest?.url;
                const sent = prevRequest?.sent;

                if ((status === 401 || status === 403) && !sent && !url?.includes('/auth/refresh')) {
                    prevRequest.sent = true;
                    try {
                        const response = await API.post('/auth/refresh');
                        const newToken = response.data.accessToken;

                        setToken(newToken);

                        prevRequest.headers['Authorization'] = `Bearer ${newToken}`;
                        return API(prevRequest);
                    } catch (refreshError) {
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );

        if (!token) {
            checkAuth();
        } else {
            setLoading(false);
        }

        return () => {
            API.interceptors.request.eject(requestIntercept);
            API.interceptors.response.eject(responseIntercept);
        };
    }, [token]);

    const login = async (email: string, password: string) => {
        setToken(null);
        try {
            console.log("login", email, password);
            const tokenResponse = await API.post("/auth/login", { email, password });
            console.log("tokenResponse", tokenResponse);
            setToken(tokenResponse.data.token);
        } catch (error: any) {
            console.error(error.response.data.message);
        }
    };

    const logout = () => {
        const logout = async () => {
            try {
                await API.post("/auth/logout");
            } catch (error: any) {
                console.error(error.response.data.message);
            } finally {
                setToken(null);
            }
        }
        logout();
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, loading }}>
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