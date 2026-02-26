import {useMutation} from "@tanstack/react-query";
import authApi from "@/modules/auth/api/auth.api";
import {AuthLoginBody} from "@/modules/auth/api/auth.api.types";
import Cookies from "js-cookie";
import {router} from "next/client";

export default function useLoginMutation() {
    return useMutation({
        mutationFn: (body: AuthLoginBody) => authApi.login(body),
        onSuccess: (data) => {
            Cookies.set('token', data.token, { expires: 1 });
            router.push('/dashboard')
        }
    })
}