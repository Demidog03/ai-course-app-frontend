import useGetMeQuery from "@/modules/users/queries/useGetMeQuery";
import {UserRolesEnum} from "@/modules/users/apis/users.api.types";
import {useMemo} from "react";

export default function useCheckIfEditable(authorId: number | undefined) {
    const { data: user } = useGetMeQuery()

    const isEditable = useMemo(() => {
        if (user?.role?.name === UserRolesEnum.ADMIN) {
            return true
        }
        if (user?.role?.name === UserRolesEnum.AUTHOR && authorId === user?.id) {
            return true
        }
        return false
    }, [user, authorId])

    return { status: isEditable }
}