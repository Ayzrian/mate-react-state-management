import { createContext, ReactElement, useState } from "react";
import { authenticate } from "../services/AuthService";

export interface AuthContextValues {
    loggedIn: boolean;
    token: string;
    login: (userName: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextValues>({
    loggedIn: false,
    token: '',
    login: () => {
        throw new Error('Not implemented!');
    }
});

export interface AuthProviderProps {
    children: ReactElement;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [loggedIn, setLoggedIn] = useState(() => {
        return !!localStorage.getItem('token');
    });
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || '';
    });

    const login = async (userName: string, password: string) => {
        const { token } = await authenticate(userName, password);

        setToken(token);
        localStorage.setItem('token', token)
        setLoggedIn(true);
    }

    return <AuthContext.Provider value={{
        loggedIn,
        login,
        token,
    }}>
        {children}
    </AuthContext.Provider>
}