'use client'

import {useMutation} from "@tanstack/react-query";
import {UpdateLessonBody} from "@/modules/lessons/api/lessons.api.types";
import lessonsApi from "@/modules/lessons/api/lessons.api";
import {LESSONS_QUERY_KEYS} from "@/modules/lessons/queries/lessons.query.types";
import {useRouter} from "next/navigation";

export default function useUpdateLessonMutation() {
    const router = useRouter()

    return useMutation({
        mutationKey: LESSONS_QUERY_KEYS.update,
        mutationFn: (body: UpdateLessonBody) => lessonsApi.updateLesson(body),
        onSuccess: (data) => {
            if (data?.lesson?.id && data?.lesson?.courseId) {
                router.replace(`/courses/${data?.lesson?.courseId}/lessons/${data?.lesson?.id}`)
            }
        }
    })
}