import {useQuery} from "@tanstack/react-query";
import {COURSES_QUERY_KEYS} from "@/modules/courses/queries/courses.query.types";
import coursesApi from "@/modules/courses/api/courses.api";

export default function useGetCourseByIdQuery(id: string) {
    return useQuery({
        queryKey: COURSES_QUERY_KEYS.getById(id),
        queryFn: () => coursesApi.getCourseById(id),
        enabled: !!id,
    })
}