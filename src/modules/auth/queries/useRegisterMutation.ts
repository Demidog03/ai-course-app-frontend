import {useMutation} from "@tanstack/react-query";
import authApi from "@/modules/auth/api/auth.api";
import {AuthRegisterBody} from "@/modules/auth/api/auth.api.types";
import {useRouter} from "next/navigation";
import {notifications} from "@mantine/notifications";

export default function useRegisterMutation() {
    const router = useRouter()

    return useMutation({
        mutationFn: (body: AuthRegisterBody) => authApi.register(body),
        onSuccess: (data) => {
            notifications.show({
                title: 'Регистрация прошла',
                message: data.message,
                color: 'green',
            })
            router.push('/login')
        }
    })
}