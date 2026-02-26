export interface AuthLoginResponse {
    type: string;
    token: string;
}

export interface AuthLoginBody {
    email: string;
    password: string;
}