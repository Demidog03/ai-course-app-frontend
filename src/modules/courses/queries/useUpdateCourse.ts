'use client'

import {useMutation} from "@tanstack/react-query";
import {COURSES_QUERY_KEYS} from "@/modules/courses/queries/courses.query.types";
import coursesApi from "@/modules/courses/api/courses.api";
import {UpdateCourseBody} from "@/modules/courses/api/courses.api.types";

interface UpdateCourseMutationPayload {
    id: string;
    body: UpdateCourseBody;
}

export default function useUpdateCourse() {
    return useMutation({
        mutationKey: COURSES_QUERY_KEYS.update,
        mutationFn: ({ id, body }: UpdateCourseMutationPayload) => coursesApi.updateCourse(id, body),
    })
}