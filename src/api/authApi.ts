import axiosInstance from "../axios/axios";
import type { MeResponse, LoginRequest, LoginResponse, RegisterRequest, RegisterResponse } from "./types/auth";

// const authApi = {
//     apiLogin: async ({ email, password }: LoginRequest) => {
//         return await axiosInstance.post<LoginResponse>("/auth/login", { email, password });
//     },
//     apiRegister: async ({ email, password, fullName }: RegisterRequest) => {
//         return await axiosInstance.post<RegisterResponse>("/auth/register", { email, password, fullName });
//     },
//     apiLogout: async () => {
//         return await axiosInstance.post("/auth/logout");
//     },
//     apiMe: async () => {
//         return await axiosInstance.get<MeResponse>("/auth/me");
//     }
// };

// export default authApi;

export async function apiLogin({ email, password }: LoginRequest): Promise<LoginResponse> {
    const { data } = await axiosInstance.post<LoginResponse>("/auth/login", { email, password });
    return data;
}

export async function apiRegister({ email, password, fullName }: RegisterRequest): Promise<RegisterResponse> {
    const { data } = await axiosInstance.post<RegisterResponse>("/auth/register", { email, password, fullname: fullName });
    return data;
}

export async function apiLogout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
}

export async function apiMe(): Promise<MeResponse> {
    const { data } = await axiosInstance.get<MeResponse>("/auth/me");
    return data;
}