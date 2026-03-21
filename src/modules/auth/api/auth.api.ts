import {apiPublic} from "@/lib/api-public";
import {
    AuthLoginBody,
    AuthLoginResponse, AuthLogoutResponse,
    AuthRegisterBody,
    AuthRegisterResponse
} from "@/modules/auth/api/auth.api.types";

async function login(body: AuthLoginBody): Promise<AuthLoginResponse> {
    const response = await apiPublic.post<AuthLoginResponse>('/auth/login', body)
    return response.data
}

async function register(body: AuthRegisterBody): Promise<AuthRegisterResponse> {
    const response = await apiPublic.post<AuthRegisterResponse>('/auth/register', body)
    return response.data
}

async function logout(): Promise<AuthLogoutResponse> {
    const response = await apiPublic.get<AuthLogoutResponse>('/auth/logout')
    return response.data
}


const authApi = { login, register, logout }

export default authApi