import {apiPublic} from "@/lib/api-public";
import {
    AuthLoginBody,
    AuthLoginResponse,
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

const authApi = { login, register }

export default authApi