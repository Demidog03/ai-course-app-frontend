import {apiPublic} from "@/lib/api-public";
import {AuthLoginBody, AuthLoginResponse} from "@/modules/auth/api/auth.api.types";

async function login(body: AuthLoginBody): Promise<AuthLoginResponse> {
    const response = await apiPublic.post<AuthLoginResponse>('/auth/login', body)
    return response.data
}

const authApi = { login }

export default authApi