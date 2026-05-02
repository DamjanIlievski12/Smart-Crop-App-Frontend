export interface AuthUser {
    id: number;
    email: string;
    fullName: string;
    createdAt: string;
}

// Request bodies
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    fullName: string;
    password: string;
}

// Response bodies
export interface LoginResponse {
    success: boolean;
    message: string;
    access_token: string;
}

export interface RegisterResponse {
    success: boolean;
    message: string;
    user: AuthUser;
}

export interface MeResponse {
    success: boolean;
    user: AuthUser;
}