import axiosInstance from "../axios/axios";
import type {
  MeResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
} from "./types/auth";

export async function apiLogin({
  email,
  password,
}: LoginRequest): Promise<LoginResponse> {
  const { data } = await axiosInstance.post<LoginResponse>("/auth/login", {
    email,
    password,
  });
  return data;
}

export async function apiRegister({
  email,
  password,
  fullName,
}: RegisterRequest): Promise<RegisterResponse> {
  const { data } = await axiosInstance.post<RegisterResponse>(
    "/auth/register",
    { email, password, fullname: fullName },
  );
  return data;
}

export async function apiLogout(): Promise<void> {
  await axiosInstance.post("/auth/logout");
}

export async function apiMe(): Promise<MeResponse> {
  const { data } = await axiosInstance.get<MeResponse>("/auth/me");
  return data;
}
