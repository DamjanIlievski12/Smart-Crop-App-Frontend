import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { AuthUser } from "../api/types/auth";
import { TOKEN_KEY } from "../axios/axios";
import { apiMe, apiLogin, apiLogout, apiRegister } from "../api/authApi";
import { AuthContext } from "../context/auth/authContext";

export function AuthProvider({ children }: { children: React.ReactNode }): React.ReactElement {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // On mount, validate any stored token via GET /auth/me
    useEffect(() => {
        if (!localStorage.getItem(TOKEN_KEY)) {
            setIsLoading(false);
            return;
        }

        apiMe()
            .then(({ user }) => setUser(user))
            .catch(() => {
                localStorage.removeItem(TOKEN_KEY);
                setToken(null);
            })
            .finally(() => setIsLoading(false));
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<void> => {
        const { access_token } = await apiLogin({ email, password });
        localStorage.setItem(TOKEN_KEY, access_token);
        setToken(access_token);
        const { user } = await apiMe();
        setUser(user);
    }, []);

    const register = useCallback(async (email: string, fullName: string, password: string): Promise<void> => {
        await apiRegister({ email, fullName, password });
        await login(email, password);
    }, [login]);

    const logout = useCallback(async (): Promise<void> => {
        try {
            await apiLogout();
        } catch {
            // Clear local state regardless of backend response
        }
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo(() => ({
        user,
        token,
        isLoading,
        login,
        register,
        logout,
    }), [user, token, isLoading, login, register, logout]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}