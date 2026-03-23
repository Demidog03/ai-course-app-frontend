'use client'

import {useMutation} from "@tanstack/react-query";
import {CreateLessonBody} from "@/modules/lessons/api/lessons.api.types";
import lessonsApi from "@/modules/lessons/api/lessons.api";
import {LESSONS_QUERY_KEYS} from "@/modules/lessons/queries/lessons.query.types";

export default function useCreateLessonMutation() {
    return useMutation({
        mutationKey: LESSONS_QUERY_KEYS.create,
        mutationFn: (body: CreateLessonBody) => lessonsApi.createLesson(body),
    })
}