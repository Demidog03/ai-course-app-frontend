import {useMutation} from "@tanstack/react-query";
import authApi from "@/modules/auth/api/auth.api";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import {notifications} from "@mantine/notifications";

export default function useLogoutMutation() {
    const router = useRouter()

    return useMutation({
        mutationFn: authApi.logout,
        onSuccess: async (data) => {
            Cookies.remove('token');
            Cookies.remove('user')

            if (data.message) {
                notifications.show({
                    title: 'Выход',
                    message: data.message,
                    color: 'green',
                })
            }

            router.push('/login')
        }
    })
}