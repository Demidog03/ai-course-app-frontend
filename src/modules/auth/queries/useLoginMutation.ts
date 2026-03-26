import {useMutation} from "@tanstack/react-query";
import authApi from "@/modules/auth/api/auth.api";
import {AuthLoginBody} from "@/modules/auth/api/auth.api.types";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {notifications} from "@mantine/notifications";

export default function useLoginMutation() {
    const router = useRouter()
    // const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (body: AuthLoginBody) => authApi.login(body),
        onSuccess: async (data) => {
            Cookies.set('token', data.token, { expires: 1 });
            notifications.show({
                title: 'Успешно',
                message: data.message,
                color: 'green',
            })

            if (data.user) {
                Cookies.set('user', JSON.stringify(data.user))
                router.push('/courses')
            }

            // queryClient.invalidateQueries({ queryKey: ['users'] })
        }
    })
}