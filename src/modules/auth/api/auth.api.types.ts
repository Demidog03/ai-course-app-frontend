export interface AuthLoginResponse {
    type: string;
    token: string;
    message: string;
}

export interface AuthLoginBody {
    email: string;
    password: string;
}

export interface AuthRegisterResponse {
    message: string;
}

export interface AuthRegisterBody {
    fullName: string;
    email: string;
    password: string;
    password_confirmation: string;
}