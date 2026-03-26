import {UserProfile} from "@/modules/users/apis/users.api.types";
import {apiPrivate} from "@/shared/lib/api-private";

async function getMe(): Promise<UserProfile> {
    const response = await apiPrivate.get<UserProfile>('/users/me')
    return response.data
}

const usersApi = { getMe }

export default usersApi