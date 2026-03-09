'use client'

import {JSX, useCallback, useEffect} from 'react';
import useGetMeQuery from "@/modules/users/queries/useGetMeQuery";
import {UserProfile} from "@/modules/users/apis/users.api.types";
import Cookies from "js-cookie";

function UserProfileWrapper({ children }: { children: JSX.Element }) {
    const { data, isSuccess} = useGetMeQuery()
    
    const saveUserInCookie = useCallback(async (isSuccess: boolean, data: UserProfile | undefined) => {
        if (isSuccess && data) {
            Cookies.set('user', JSON.stringify(data))
        }
    }, [])
    
    useEffect(() => {
        void saveUserInCookie(isSuccess, data)
    }, [isSuccess, data])

    return children
}

export default UserProfileWrapper;