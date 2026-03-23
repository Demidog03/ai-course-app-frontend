'use client'

import {useQuery} from "@tanstack/react-query";
import {GetLessonBody} from "@/modules/lessons/api/lessons.api.types";
import lessonsApi from "@/modules/lessons/api/lessons.api";
import {LESSONS_QUERY_KEYS} from "@/modules/lessons/queries/lessons.query.types";

export default function useGetLessonQuery(body: GetLessonBody) {
    return useQuery({
        queryKey: LESSONS_QUERY_KEYS.get(body),
        queryFn: () => lessonsApi.getLesson(body),
    })
}