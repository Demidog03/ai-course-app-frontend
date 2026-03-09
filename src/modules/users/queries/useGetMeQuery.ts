import {useQuery} from "@tanstack/react-query";
import {USERS_QUERY_KEYS} from "@/modules/users/queries/users.query.types";
import usersApi from "@/modules/users/apis/users.api";

export default function useGetMeQuery() {
    return useQuery({
        queryKey: USERS_QUERY_KEYS.me,
        queryFn: () => usersApi.getMe(),
    })
}